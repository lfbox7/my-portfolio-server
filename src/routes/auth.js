const jwt = require('express-jwt');
const secret = require('../config').secret;

getTokenFromHeader = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}

const auth = {
    required: jwt({
        secret: secret,
        algorithms: ['RS256'],
        getToken: getTokenFromHeader
    }),
    optional: jwt({
      secret: secret,
      algorithms: ['RS256'],
      credentialsRequired: false,
      getToken: getTokenFromHeader
    })
  };
  
  module.exports = auth;