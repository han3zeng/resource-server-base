const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app/index.js');
const mongoose = require('mongoose');
// const db = require('../db/index.js');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

const opts = {}; // remove this option if you use mongoose 5 and above

describe('POST urlShorten', () => {
  // before((done) => {
  //   db.connect()
  //     .then(() => {
  //       done();
  //     })
  //     .catch((err) => {
  //       done(err);
  //     });
  // });
  let mongoServer;
  before(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getConnectionString();
    await mongoose.connect(mongoUri, opts, (err) => {
      if (err) console.error(err);
    });
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  // after((done) => {
  //   db.close()
  //     .then(() => {
  //       done();
  //     })
  //     .catch((err) => {
  //       done(err);
  //     });
  // });

  it('OK, creating a new shortenUrl', (done) => {
    request(app).post('/api/shorturl/new')
      .send({
        originalUrl: 'https://www.hansdomain.com.tw/this/is/a/test'
      })
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('_id');
        expect(body).to.contain.property('originalUrl');
        expect(body).to.contain.property('urlCode');
        expect(body).to.contain.property('shortenUrl');
        expect(body).to.contain.property('createdAt');
        expect(body).to.contain.property('updatedAt');
        done();
      })
      .catch((err) => done(err));
  });
});
