const _get = require('lodash/get');
const { error } = require('../utils/responses');
const config = require('../config/config');
const { signInRequest } = require('../utils/authApi');
const { nodeEnvIsProd } = config;

const _ = {
  get: _get
};

const signIn = (app) => {
  app.post('/user/signin', async (req, res) => {
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
            sameSite: nodeEnvIsProd ? 'none' : 'lax',
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
          status: _.get(responseObject, 'status', null),
          errorMessage: _.get(responseObject, 'response.errorMessage', null)
        });
      }
    } catch (e) {
      error({
        res,
        status: 500,
        errorMessage: `Internal Server Error. Caused by the authorizatoin-server: ${e.message}`
      });
    }
  });
};

module.exports = signIn;
