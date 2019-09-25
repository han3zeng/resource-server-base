const hello = (app) => {
  app.get('/', (req, res) => {
    res.send('travis setting test Hello World!!');
  });
};

module.exports = hello;
