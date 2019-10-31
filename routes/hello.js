const hello = (app) => {
  app.get('/', (req, res) => {
    res.send('basic running test');
  });
};

module.exports = hello;
