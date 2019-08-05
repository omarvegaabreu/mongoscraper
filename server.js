//dependencies
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const http = require("http");

//initialize Express app
const express = require("express");
const app = express();

app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(express.static(process.cwd() + "/public"));
//Require set up handlebars
var exphbs = require("express-handlebars");
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//connecting to MongoDB
//mongoose.connect("mongodb://localhost/scraped_news");
const db = process.env.MONGODB_URI || "mongodb://localhost/mongoscraper";
// mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

var routes = require("./controllers/controllers");
app.use("/", routes);

//Create localhost port.
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on PORT " + port);
});
