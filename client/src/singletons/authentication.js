import auth0 from 'auth0-js';

import config from '../config';

export default new auth0.WebAuth({
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  redirectUri: `${process.env.REACT_APP_URL}/callback`,
  responseType: 'token id_token',
  // check out https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims
  // for all of the standard claims we can make on user information
  scope: `openid email email_verified phone_number phone_number_verified ${config
    .auth0.claimNamespace}/name`
});
