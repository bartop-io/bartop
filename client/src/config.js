const requiredEnvVars = [
  'REACT_APP_AUTH0_DOMAIN',
  'REACT_APP_AUTH0_CLIENT_ID',
  'REACT_APP_AUTH0_CLAIM_NAMESPACE',
  'REACT_APP_URL'
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
    claimNamespace: process.env.REACT_APP_AUTH0_CLAIM_NAMESPACE
  },
  url: process.env.REACT_APP_URL
};
