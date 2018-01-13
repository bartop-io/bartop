// determine when the token will expire
export const willExpireAt = expiresIn =>
  expiresIn * 1000 + new Date().getTime();

// check whether the current time is past the access token's expiry time
export const isExpired = expiresAt => expiresAt <= new Date().getTime();
