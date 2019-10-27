const hello = (app) => {
  app.get('/', (req, res) => {
    res.send('travis cd test!! version 1-0-5');
  });
};

module.exports = hello;
