// verify access token
const _get = require('lodash/get');
const { success, error } = require('../utils/responses');
const { verifyTokenWithAuthServer } = require('../utils/authApi');

const _ = {
  get: _get
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
