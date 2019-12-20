const ENV_CONSTANTS = require('../constants/env');

module.exports = Object.freeze({
  nodeEnv: process.NODE_ENV || ENV_CONSTANTS.DEVELOPMENT,
  nodeEnvIsProd: process.NODE_ENV === ENV_CONSTANTS.PRODUCTION,
  origin: process.NODE_ENV === ENV_CONSTANTS.PRODUCTION ? 'https://url-shortener-back.appspot.com' : 'http://localhost:3033',
  domain: process.NODE_ENV === ENV_CONSTANTS.PRODUCTION ? '.url-shortener-back.appspot.com' : 'localhost',
  allowedOrigins: ['http://localhost:3000', 'https://portfolio-and-trial.appspot.com'],
  authServerOrigin: process.NODE_ENV === ENV_CONSTANTS.PRODUCTION ? 'https://authorization-server.appspot.com' : 'https://localhost:3030',
  authServerHostName: process.NODE_ENV === ENV_CONSTANTS.PRODUCTION ? 'authorization-server.appspot.com' : 'localhost:3030'
});
