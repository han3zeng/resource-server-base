const ENV_CONSTANTS = require('../constants/env');

module.exports = Object.freeze({
  nodeEnv: process.env.NODE_ENV || ENV_CONSTANTS.DEVELOPMENT,
  nodeEnvIsProd: process.env.NODE_ENV === ENV_CONSTANTS.PRODUCTION,
  origin: process.env.NODE_ENV === ENV_CONSTANTS.PRODUCTION ? 'https://url-shortener-back.appspot.com' : 'http://localhost:3033',
  domain: process.env.NODE_ENV === ENV_CONSTANTS.PRODUCTION ? 'url-shortener-back.appspot.com' : 'localhost',
  frontEndDomain: process.env.NODE_ENV === ENV_CONSTANTS.PRODUCTION ? 'portfolio-and-trial.appspot.com' : 'localhost',
  allowedOrigins: ['http://localhost:8080', 'http://localhost:3000', 'https://portfolio-and-trial.appspot.com'],
  authServerOrigin: process.env.NODE_ENV === ENV_CONSTANTS.PRODUCTION ? 'https://authorization-server-261201.appspot.com' : 'https://localhost:3030',
  authServerHostName: process.env.NODE_ENV === ENV_CONSTANTS.PRODUCTION ? 'authorization-server-261201.appspot.com' : 'localhost',
  authServerPort: process.env.NODE_ENV === ENV_CONSTANTS.PRODUCTION ? 443 : 3030
});
