const hello = (app) => {
  app.get('/', (req, res) => {
    res.send('travis cd test 04!!');
  });
};

module.exports = hello;
