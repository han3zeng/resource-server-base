'use strict';

/* connect to mongodb */
const db = require('../db/index.js');
const app = require('../app/index.js');

db.connect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`app is running on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log('mongodb non-catch error: ', err);
  });
