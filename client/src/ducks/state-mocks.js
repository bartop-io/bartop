import config from '../config';

// general-use mocks
export const mockError = { message: 'mock error' };

// authentication & user related mocks
export const mockIdToken = 'mockIdToken';

export const mockAuthResult = {
  accessToken: 'mockAccessToken',
  expiresIn: 60,
  idToken: mockIdToken
};

export const mockId = 'mockId';
export const mockName = 'mockName';
export const mockEmail = 'mockEmail';
export const mockPhoneNumber = 'mockPhoneNumber';

export const mockDecodedIdTokenWithoutName = {
  sub: mockId,
  email: mockEmail,
  phoneNumber: mockPhoneNumber
};

export const mockDecodedIdTokenWithName = {
  sub: mockId,
  email: mockEmail,
  phoneNumber: mockPhoneNumber,
  [`${config.auth0.claimNamespace}/name`]: mockName
};

export const mockUserInfo = {
  id: mockId,
  name: mockName,
  email: mockEmail,
  phoneNumber: mockPhoneNumber
};

export const mockAuthStatuses = {
  default: {
    loggingIn: false,
    loggedIn: false,
    error: null
  },
  requesting: {
    loggingIn: true,
    loggedIn: false,
    error: null
  },
  success: {
    loggingIn: false,
    loggedIn: true,
    error: null
  },
  failure: {
    loggingIn: false,
    loggedIn: false,
    error: mockError
  }
};
