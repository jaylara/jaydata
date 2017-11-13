///Jay Lara
///jaydata
///server.js - main starting point for web application

//dependencies - requirements
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const routes = require("./routes/index.js");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes);

//start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
