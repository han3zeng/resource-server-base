// verify access token
const _get = require('lodash/get');
const https = require('https');
const http = require('http');
const { success, error } = require('../utils/responses');
const config = require('../config/config');
const { getCredentials } = require('../utils');

const { API_KEY } = getCredentials();


const _ = {
  get: _get,
}
const { nodeEnvIsProd } = config;

const protocol = nodeEnvIsProd ? https : http;

const verifyTokenWithAuthServer = (authHeader) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostName: config.authServerOrigin,
      port: 3030,
      path: '/verify-token',
      method: 'GET',
      headers: {
        Authorization: authHeader,
        'API-Key': API_KEY,
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
    req.end();
  });
};

const verifyToken = (app) => {
  app.get('/verify-token', (req, res) => {
    const authHeader = req.get('Authorization');
    verifyTokenWithAuthServer(authHeader)
      .then((response) => {
        const responseObject = JSON.parse(response);
        if (responseObject.ok) {
          success({
            res,
            status: responseObject.status,
            data: _.get(responseObject, 'response.data', null),
            statusCode: _.get(responseObject, 'response.statusCode', null)
          });
        } else {
          error({
            res,
            status: responseObject.status,
            errorMessage: _.get(responseObject, 'response.errorMessage', null)
          });
        }
      })
      .catch((e) => {
        error({
          status: 500,
          errorMessage: `Internal Server Error. Caused by the authorizatoin-server: ${e.message}`
        });
      });
  });
};

module.exports = verifyToken;
