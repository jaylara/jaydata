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

app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    return next();
});

app.use('/', routes);

//start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
