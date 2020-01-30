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

const signOutRequest = (authHeader) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: config.authServerHostName,
      port: config.authServerPort,
      path: '/user/signout',
      method: 'POST',
      headers: {
        Authorization: authHeader,
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
    req.end();
  });
};

const signOut = (app) => {
  app.post('/user/signout', async (req, res) => {
    const authHeader = req.get('Authorization') || (req.cookies && req.cookies['access-token'] && `Bearer ${req.cookies['access-token']}`);
    if (!authHeader) {
      error({
        res,
        status: 403,
        errorMessage: 'has no valid auth header include in the request'
      });
    }
    try {
      const response = await signOutRequest(authHeader);
      const responseObject = JSON.parse(response);
      if (responseObject.ok) {
        // success({
        //   res,
        //   status: 200,
        //   data: {
        //     message: 'user sign out successfully'
        //   },
        //   statusCode: null
        // });
        res
          .status(200)
          .clearCookie('access-token', { path: '/' })
          .json({
            ok: true,
            status: 200,
            response: {
              data: 'user sign out successfully',
              statusCode: 1
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

module.exports = signOut;
