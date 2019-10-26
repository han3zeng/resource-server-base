const hello = (app) => {
  app.get('/', (req, res) => {
    res.send('travis cd test 03!!');
  });
};

module.exports = hello;
