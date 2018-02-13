const axios = require('axios');
const auth = require('../../config').auth;

module.exports = async function getTestToken() {
  const options = {
    method: 'POST',
    url: 'https://bartop.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    data: `{"client_id":"${auth.id}",
            "client_secret":"${auth.secret}",
            "audience":"${auth.audience}",
            "grant_type":"${auth.grant}"}`
  };
  const response = await axios(options);
  return response.data.access_token;
};
