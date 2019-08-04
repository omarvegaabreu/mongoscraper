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

//handlebars middleware

const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening on PORT " + PORT);
});
