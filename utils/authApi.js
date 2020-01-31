const https = require('https');
const http = require('http');
const { getCredentials } = require('./index');
const config = require('../config/config');
const { API_KEY } = getCredentials();
const { nodeEnvIsProd } = config;

const protocol = nodeEnvIsProd ? https : http;

const generateOption = (
  options = {},
  headers = {}
) => {
  const optionBase = {
    hostname: config.authServerHostName,
    port: config.authServerPort
  };
  const headerBase = {
    'Content-Type': 'application/json',
    'API-Key': API_KEY
  };
  return {
    ...optionBase,
    ...options,
    headers: {
      ...headerBase,
      ...headers
    }
  };
};

const generateReq = ({ options, resolve }) => {
  const req = protocol.request(options, (res) => {
    res.setEncoding('utf8');
    let result = '';
    res.on('data', (response) => {
      result = `${result}${response}`;
    });
    res.on('end', () => {
      resolve(result);
    });
  });
  return req;
};

const signInRequest = (email, password) => {
  return new Promise((resolve, reject) => {
    const options = generateOption(
      {
        path: '/user/signin',
        method: 'POST'
      }
    );
    const req = generateReq({
      options,
      resolve
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

const signOutRequest = (authHeader) => {
  return new Promise((resolve, reject) => {
    const options = generateOption(
      {
        path: '/user/signout',
        method: 'POST'
      },
      {
        Authorization: authHeader
      }
    );
    const req = generateReq({
      options,
      resolve
    });
    req.on('error', (e) => {
      reject(e);
    });
    req.end();
  });
};

const signUpRequest = ({
  username,
  email,
  password,
  firstName,
  lastName
}) => {
  return new Promise((resolve, reject) => {
    const options = generateOption(
      {
        path: '/user/signup',
        method: 'POST'
      }
    );
    const req = generateReq({
      options,
      resolve
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

const verifyTokenWithAuthServer = (authHeader) => {
  return new Promise((resolve, reject) => {
    const options = generateOption(
      {
        path: '/verify-token',
        method: 'GET'
      }
    );
    const req = generateReq({
      options,
      resolve
    });
    req.on('error', (e) => {
      reject(e);
    });
    req.end();
  });
};

module.exports = {
  signInRequest,
  signOutRequest,
  signUpRequest,
  verifyTokenWithAuthServer
};
