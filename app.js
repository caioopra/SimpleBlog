const express = require("express");
const morgan = require("morgan");

const app = express();

app.set("view engine", "ejs");
app.listen(3000);
app.use(express.static("public"));
app.use(morgan("dev"));

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