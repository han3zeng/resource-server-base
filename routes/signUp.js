const _get = require('lodash/get');
const { error, success } = require('../utils/responses');
const { signUpRequest } = require('../utils/authApi');

const _ = {
  get: _get
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
