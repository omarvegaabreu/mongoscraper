//dependencies
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const http = require("http");
//initialize Express app
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static(process.cwd() + "/public"));
//Require set up handlebars
const exphbs = require("express-handlebars");
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//connecting to MongoDB
//mongoose.connect("mongodb://localhost/scraped_news");
let db = process.env.MONGODB_URI || "mongodb://localhost/mongoscraper";
// mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

var routes = require("./controllers/controllers");
app.use("/", routes);

//Create localhost port.

app.listen(PORT, function() {
  console.log("Listening on PORT " + PORT);
});
