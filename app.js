const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const Blog = require("./models/blog");

const app = express();

// connection to mongoDB
const dbURI = "mongodb+srv://caioopra:Z1toLjllxRKGqn8O@nodeblog.jgjtkzr.mongodb.net/nodeBlog?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(3000);
        console.log("Connectd do MongoDB")
    })
    .catch((err) => console.log(err));

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
    // TODO: change this to a separte homepage
    // const blogs = [
    //     { title: "Blog number 1", snippet: "Lorem ipsum dolor sit amet consectetur"},
    //     { title: "Blog number 2", snippet: "Lorem ipsum dolor sit amet consectetur"},
    //     { title: "Blog number 3", snippet: "Lorem ipsum dolor sit amet consectetur"},
    // ];

    // res.render("index", { title: "Home", blogs} );

    // currently redirecting the home page to the blogs page
    res.redirect("/blogs");
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About"} );
});

// blog routes
app.get(("/blogs"), (req, res) => {
    Blog.find().sort( { createdAt: -1 }) // descending order
        .then((result) => {
            res.render("index", { title: "All Blogs", blogs: result })
        })
        .catch((error) => console.log(error));
});

app.post("/blogs", (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect("/blogs")
        })
        .catch((err) => console.log(err));
})

app.get("/blogs/:id", (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render("details", { blog: result, title: "Blog Details" });
        })
        .catch((err) => console.log(err));
})

app.delete("/blogs/:id", (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: "/blogs" });
        })
        .catch((err) => console.log(err));
})

app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "Create a new Blog" });
});

// 404
app.use((req, res) => {
    res.status(404).render("404", { title: "Error" })
})