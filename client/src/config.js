const requiredEnvVars = [
  'REACT_APP_AUTH0_DOMAIN',
  'REACT_APP_AUTH0_CLIENT_ID',
  'REACT_APP_AUTH0_CLAIM_NAMESPACE',
  'REACT_APP_AUTH0_BARTOP_API_AUDIENCE',
  'REACT_APP_URL',
  'REACT_APP_BARTOP_API_URL'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing necessary environment variables: ${missingEnvVars.join(', ')}`
  );
}

export default {
  auth0: {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
    claimNamespace: process.env.REACT_APP_AUTH0_CLAIM_NAMESPACE,
    apiAudience: process.env.REACT_APP_AUTH0_BARTOP_API_AUDIENCE
  },
  url: process.env.REACT_APP_URL,
  apis: {
    bartop: {
      url: process.env.REACT_APP_BARTOP_API_URL
    }
  }
};
