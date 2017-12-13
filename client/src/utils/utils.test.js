// // determine when the token will expire
// export const willExpireAt = expiresIn =>
//   expiresIn * 1000 + new Date().getTime();

// // check whether the current time is past the access token's expiry time
// export const isExpired = expiresAt => expiresAt <= new Date().getTime();

import { willExpireAt, isExpired } from './utils';

describe('willExpireAt', () => {
  it('calculates expiration time given a duration', () => {
    const expiresIn = 1000;
    // divide to form a floating point number so we can use
    //toBeCloseTo() since it may be off by a few milliseconds
    expect(willExpireAt(expiresIn) / 1000).toBeCloseTo(
      (expiresIn * 1000 + new Date().getTime()) / 1000
    );
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
