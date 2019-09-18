const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const urlShortenPrototype = {
  originalUrl: String,
  urlCode: String,
  shortenUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
};
const UrlShortenSchema = new Schema(urlShortenPrototype);
model('UrlShorten', UrlShortenSchema);
