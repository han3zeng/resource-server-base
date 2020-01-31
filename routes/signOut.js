const _get = require('lodash/get');
const { error } = require('../utils/responses');
const { signOutRequest } = require('../utils/authApi');

const _ = {
  get: _get
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
