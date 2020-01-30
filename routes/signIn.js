const _get = require('lodash/get');
const https = require('https');
const http = require('http');
const { error, success } = require('../utils/responses');
const config = require('../config/config');
const { getCredentials } = require('../utils');

const { API_KEY } = getCredentials();
const { nodeEnvIsProd } = config;
const protocol = nodeEnvIsProd ? https : http;

const _ = {
  get: _get
};

const signInRequest = (email, password) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostName: config.authServerOrigin,
      port: 3030,
      path: '/user/signin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': API_KEY
      }
    };
    const req = protocol.request(options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (response) => {
        resolve(response);
      });
      res.on('end', () => {
        console.log('no more data');
      });
    });
    req.on('error', (e) => {
      reject(e);
    });
    req.write(JSON.stringify({
      email,
      password
    }));
    req.end();
  });
};

const signIn = (app) => {
  app.post('/user/signin', async (req, res) => {
    const authHeader = (req.cookies && req.cookies['access-token'] && `Bearer ${req.cookies['access-token']}`);
    // if (authHeader) {
    //   return error({
    //     res,
    //     status: 400,
    //     errorMessage: 'Bad Request. User has been signed in'
    //   });
    // }
    const { email, password } = req.body;
    try {
      const response = await signInRequest(email, password);
      const responseObject = JSON.parse(response);
      if (responseObject.ok) {
        const accessToken = _.get(responseObject, 'response.data.token.jwt', null);
        const expTimestamp = _.get(responseObject, 'response.data.token.exp', null);
        res
          .status(200)
          .cookie('access-token', accessToken, {
            domain: config.domain,
            httpOnly: true,
            secure: nodeEnvIsProd,
            expires: expTimestamp ? new Date(expTimestamp * 1000) : null
          })
          .json({
            ok: true,
            status: 200,
            response: {
              data: _.get(responseObject, 'response.data.userProfile', null),
              statusCode: _.get(responseObject, 'response.statusCode', null)
            }
          });
      } else {
        error({
          res,
          status: responseObject.status,
          errorMessage: _.get(responseObject, 'response.errorMessage', null)
        });
      }
    } catch (e) {
      error({
        status: 500,
        errorMessage: `Internal Server Error. Caused by the authorizatoin-server: ${e.message}`
      });
    }
  });
};

module.exports = signIn;
