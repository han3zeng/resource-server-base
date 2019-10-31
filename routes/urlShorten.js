const mongoose = require('mongoose');
const validUrl = require('valid-url');
const UrlShorten = mongoose.model('UrlShorten');
const shortid = require('shortid');
const config = require('../config/config.js');

const urlValidation = ({ res, originalUrl }) => {
  if (!validUrl.isUri(originalUrl)) {
    return res.status(401).json({
      error: 'invalid URL'
    });
  }
};

const urlShorten = (app) => {
  app.post('/api/shorturl/new', async (req, res) => {
    const { originalUrl } = req.body;
    const urlObject = new URL(originalUrl);
    const urlCode = shortid.generate();

    urlValidation({
      res,
      originalUrl
    });

    try {
      const doc = await UrlShorten.findOne({ originalUrl });
      if (doc) {
        res.status(200).json(doc);
      } else {
        const newDoc = {
          originalUrl: urlObject.href,
          urlCode,
          shortenUrl: `${config.origin}/${urlCode}`,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        UrlShorten.create(newDoc, (err, doc) => {
          if (err) {
            throw new Error(err);
          }
          res.status(200).json(doc);
        });
      }
    } catch (e) {
      return res.status(500).json({
        error: 'system error'
      });
    }
  });
};

module.exports = urlShorten;
