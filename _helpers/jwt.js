const expressJwt = require('express-jwt');
const userService = require('../app/users/user.service');

function jwt() {
  const secret = process.env.secret;
  return expressJwt({ secret, isRevoked }).unless({
    path: ['/user/authenticate', '/user/register']
  });
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
}

module.exports = jwt;