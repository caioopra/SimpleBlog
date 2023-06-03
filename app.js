const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const Blog = require("./models/blog");

const app = express();

// connection to mongoDB
const dbURI = "mongodb+srv://caioopra:<password>.jgjtkzr.mongodb.net/nodeBlog?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(3000);
        console.log("Connectd do MongoDB")
    })
    .catch((err) => console.log(err));

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(morgan("dev"));

// mongoose and mongoDB testing routes
app.get("/add-blog", (req, res) => {
    const blog = new Blog({
        title: "New Blog 2.0",
        snippet: "About my new blog",
        body: "More about my blog"
    });

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => console.log(err));
});

app.get("/all-blogs", (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => console.log(err));
})

app.get("/single-blog", (req, res) => {
    Blog.findById("647b46d77ade5d98971ca732")
        .then((result) => {
            res.send(result)
        })
        .catch((err) => console.log(err));
})

app.get("/", (req, res) => {
    const blogs = [
        { title: "Blog number 1", snippet: "Lorem ipsum dolor sit amet consectetur"},
        { title: "Blog number 2", snippet: "Lorem ipsum dolor sit amet consectetur"},
        { title: "Blog number 3", snippet: "Lorem ipsum dolor sit amet consectetur"},
    ];

    res.render("index", { title: "Home", blogs} );
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About"} );
});

app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "Create a new Blog" });
});

// 404
app.use((req, res) => {
    res.status(404).render("404", { title: "Error" })
})