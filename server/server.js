'use strict'


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


/* route */
const routeHello = require('../routes/hello');
routeHello(app);



app.listen(process.env.PORT, () => {
  console.log(`app is running on port: ${process.env.PORT}`)
})
