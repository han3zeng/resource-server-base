const fs = require('fs');
const path = require('path');

const getCredentials = () => {
  try {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../constants/credentials.json')));
  } catch (e) {
    console.log('fail to read credentisl: ', e);
    return {};
  }
};

module.exports = {
  getCredentials
};
