const mongoose = require('mongoose');
const UrlShorten = mongoose.model('UrlShorten');

const redirectToOriginalUrl = (app) => {
  app.get('/:urlCode', async (req, res) => {
    const { urlCode } = req.params;
    try {
      const doc = await UrlShorten.findOne({ urlCode });
      if (doc) {
        res.redirect(doc.originalUrl);
      } else {
        res.send("can't found any matched url");
      }
    } catch (err) {
      res.status(500).json({
        error: 'system error'
      });
    }
  });
};

module.exports = redirectToOriginalUrl;
