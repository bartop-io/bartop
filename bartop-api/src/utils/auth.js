const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const config = require('../../config');

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the
  // signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://bartop.auth0.com/.well-known/jwks.json`
  }),

  // Don't require authorization in local development
  credentialsRequired: config.env !== 'local',

  // Validate the audience and the issuer.
  audience: config.auth.audience,
  issuer: `https://bartop.auth0.com/`,
  algorithms: ['RS256']
});

module.exports = checkJwt;
