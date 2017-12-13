// // determine when the token will expire
// export const willExpireAt = expiresIn =>
//   expiresIn * 1000 + new Date().getTime();

// // check whether the current time is past the access token's expiry time
// export const isExpired = expiresAt => expiresAt <= new Date().getTime();

import { willExpireAt, isExpired } from './utils';

describe('willExpireAt', () => {
  it('calculates expiration time given a duration', () => {
    const expiresIn = 1000;
    // there can be a slight difference in new Date().getTime()
    // so use math to give some leeway
    expect(
      Math.abs(
        willExpireAt(expiresIn) - (expiresIn * 1000 + new Date().getTime())
      )
    ).toBeLessThan(1000);
  });
});

describe('isExpired', () => {
  it('returns true if in the past', () => {
    expect(isExpired(new Date().getTime() - 1000)).toBe(true);
  });
  it('returns true if now', () => {
    expect(isExpired(new Date().getTime())).toBe(true);
  });
  it('returns false if in the future', () => {
    expect(isExpired(new Date().getTime + 1000)).toBe(false);
  });
});
