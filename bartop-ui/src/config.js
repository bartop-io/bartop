const requiredEnvVars = [
  'REACT_APP_AUTH0_DOMAIN',
  'REACT_APP_AUTH0_CLIENT_ID',
  'REACT_APP_AUTH0_CLAIM_NAMESPACE',
  'REACT_APP_AUTH0_BARTOP_API_AUDIENCE',
  'REACT_APP_BARTOP_API_URL'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  const message = `Missing necessary environment variables: ${missingEnvVars.join(
    ', '
  )}`;
  if (process.env.NODE_ENV === 'PRODUCTION') {
    throw new Error(message);
  }
  console.warn(message);
}

export default {
  auth0: {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
    claimNamespace: process.env.REACT_APP_AUTH0_CLAIM_NAMESPACE,
    apiAudience: process.env.REACT_APP_AUTH0_BARTOP_API_AUDIENCE
  },
  // dynamically determine the URL the app is running at (used for the auth callback)
  url: `${window.location.protocol}//${window.location.hostname}${window
    .location.port && `:${window.location.port}`}`,
  apis: {
    bartop: {
      url: process.env.REACT_APP_BARTOP_API_URL
    }
  }
};
