const hello = (app) => {
  app.get('/', (req, res) => {
    res.send('travis cd test!! version 1-0-4');
  });
};

module.exports = hello;
