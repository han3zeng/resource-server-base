const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// create application/json parser
const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(jsonParser);
app.use(urlencodedParser);

/* main */
require('../db/models/UrlShorten');

/* route */
const routeHello = require('../routes/hello');
const urlShorten = require('../routes/urlShorten');
routeHello(app);
urlShorten(app);

module.exports = app;
