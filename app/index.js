const allowedOrigins = require('../config/config').allowedOrigins;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// create application/json parser
const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(jsonParser);
app.use(urlencodedParser);

function cors(req, res, next) {
  const requsterOrigin = req.headers.origin;
  if (allowedOrigins.indexOf(requsterOrigin) > -1) {
    res.header('Access-Control-Allow-Origin', requsterOrigin);
  }
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,x-access-token,X-Key,Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
}

app.use(cors);

/* main */
require('../db/models/UrlShorten');

/* route */
const routeHello = require('../routes/hello');
const urlShorten = require('../routes/urlShorten');
const redirectToOriginalUrl = require('../routes/redirectToOriginalUrl');
const verifyToken = require('../routes/verifyToken');
const retrieveUserProfile = require('../routes/retrieveUserProfile');

retrieveUserProfile(app);
verifyToken(app);
routeHello(app);
urlShorten(app);
redirectToOriginalUrl(app);

module.exports = app;
