// verify access token
const _get = require('lodash/get');
const https = require('https');
const http = require('http');
const { success, error } = require('../utils/responses');
const config = require('../config/config');
const { getCredentials } = require('../utils');

const { API_KEY } = getCredentials();

const _ = {
  get: _get
};

const { nodeEnvIsProd } = config;

const protocol = nodeEnvIsProd ? https : http;

const retrieve = (authHeader) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: config.authServerHostName,
      port: config.authServerPort,
      path: '/retrieve-user-profile',
      method: 'GET',
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

const retrieveUserProfile = (app) => {
  app.post('/api/retrieve-user-profile', (req, res) => {
    const authHeader = req.get('Authorization') || (req.cookies && req.cookies['access-token'] && `Bearer ${req.cookies['access-token']}`);
    if (!authHeader) {
      return error({
        res,
        status: 403,
        errorMessage: 'has no valid auth header include in the request'
      });
    }
    retrieve(authHeader)
      .then((response) => {
        const responseObject = JSON.parse(response);
        if (responseObject.ok) {
          if (req.cookies && req.cookies['access-token']) {
            success({
              res,
              status: 200,
              data: _.get(responseObject, 'response.data.userProfile', null),
              statusCode: _.get(responseObject, 'response.statusCode', null)
            });
          } else {
            const accessToken = authHeader.split(' ')[1];
            const expTimestamp = _.get(responseObject, 'response.data.tokenPayload.exp', null);
            res
              .status(200)
              .cookie('access-token', accessToken, {
                domain: config.domain,
                path: '/',
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
          }
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

module.exports = retrieveUserProfile;
