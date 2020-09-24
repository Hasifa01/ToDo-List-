//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

let newItems = ["Eat", "Sleep", "Repeat"];
let newWorkItems = [];

app.get("/", function (req, res) {
  let day = date.getDate();

  res.render("list", { listTitle: day, items: newItems });
});

app.post("/", function (req, res) {
  let list = req.body.list;

  if (list === "Work") {
    newWorkItems.push(req.body.newItem);

    res.redirect("/work");
  } else {
    newItems.push(req.body.newItem);

    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", {
    listTitle: "Work List",
    items: newWorkItems,
  });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.post("/about", function (req, res) {
  res.redirect("/about");
});

app.listen(3000, function () {
  console.log("The server is running on port 3000");
});
