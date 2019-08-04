//dependencies

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");

//express

const express = require("express");
const app = express();

//logger (morgan) middleware

app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

//route to public folder
app.use(express.static(process.cwd() + "/public"));

//handlebars middleware

const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//mongoose
mongoose.connect("mongodb://localhost/scrapped_news");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to Mongoose!");
});

//PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening on PORT " + PORT);
});
