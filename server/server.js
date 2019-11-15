'use strict';

/* connect to mongodb */
const db = require('../db/index.js');
const app = require('../app/index.js');

const thePort = process.env.PORT || 8080;

db.connect()
  .then(() => {
    app.listen(thePort, () => {
      console.log(`app is running on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log('mongodb non-catch error: ', err);
  });
