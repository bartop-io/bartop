export const isExpired = expiresAt => {
  // check whether the current time is past the access token's expiry time
  return expiresAt <= new Date().getTime();
};
