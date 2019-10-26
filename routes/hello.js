const hello = (app) => {
  app.get('/', (req, res) => {
    res.send('travis cd test 07!!');
  });
};

module.exports = hello;
