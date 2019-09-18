'use strict';

/* config */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// create application/json parser
const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(jsonParser);
app.use(urlencodedParser);

/* connect to mongodb */
const mongoose = require('mongoose');
// keepAlive prevent TCP connection from closing because of idle status.
const connectOptions = {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
};
mongoose.connect(process.env.MONGO_URI, connectOptions, (err, db) => {
  if (err) {
    console.log('have problem connecting to mongoDb: ', err);
  }
  console.log('connect to mongoDb successfullly');
});

/* route */
const routeHello = require('../routes/hello');
routeHello(app);

app.listen(process.env.PORT, () => {
  console.log(`app is running on port: ${process.env.PORT}`);
});
