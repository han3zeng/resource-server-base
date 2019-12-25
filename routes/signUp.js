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

const signUpRequest = ({
  username,
  email,
  password,
  firstName,
  lastName
}) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostName: config.authServerOrigin,
      port: 3030,
      path: '/user/signup',
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
      username,
      email,
      password,
      firstName,
      lastName
    }));
    req.end();
  });
};

const signUp = (app) => {
  app.post('/user/signup', async (req, res) => {
    const { username, email, password, firstName, lastName } = req.body;
    try {
      const response = await signUpRequest({
        username,
        email,
        password,
        firstName,
        lastName
      });
      const responseObject = JSON.parse(response);
      if (responseObject.ok) {
        const message = _.get(responseObject, 'response.data.message', null);
        success({
          res,
          status: 200,
          data: {
            message
          },
          statusCode: null
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

module.exports = signUp;
