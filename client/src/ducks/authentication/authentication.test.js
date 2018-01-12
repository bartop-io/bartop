import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, { types, actions, initialState } from './authentication';
import { types as userTypes } from '../user/user';
import {
  mockAuthResult,
  mockUserInfo,
  mockError,
  mockDecodedIdTokenWithName,
  mockDecodedIdTokenWithoutName,
  mockAuthStatuses
} from '../state-mocks';

// import & mock authentication's dependencies so we can spy on functions
import jwtDecode from 'jwt-decode';
import auth from '../../singletons/authentication';
import * as utils from '../../utils/utils';

jest.mock('jwt-decode');
jest.mock('../../singletons/authentication');
jest.mock('../../utils/utils');

describe('authentication actions', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call auth authorize when requesting login', () => {
    const expectedAction = {
      type: types.LOGIN_REQUEST
    };
    expect(auth.authorize).not.toBeCalled();
    const action = actions.loginRequest();
    expect(action).toEqual(expectedAction);
    expect(auth.authorize).toBeCalled();
  });

  it('should call login success with result of authentication', () => {
    const expectedAction = {
      type: types.LOGIN_SUCCESS,
      accessToken: mockAuthResult.accessToken,
      expiresIn: mockAuthResult.expiresIn,
      userInfo: mockUserInfo
    };
    const action = actions.loginSuccess(
      mockAuthResult.accessToken,
      mockAuthResult.expiresIn,
      mockUserInfo
    );
    expect(action).toEqual(expectedAction);
  });

  it('should fail login with an error', () => {
    const expectedAction = {
      type: types.LOGIN_FAILURE,
      error: mockError
    };
    const action = actions.loginFailure(mockError);
    expect(action).toEqual(expectedAction);
  });

  describe('can handle authentication', () => {
    let store;

    beforeAll(() => {
      store = configureMockStore([thunk])();
    });

    afterEach(() => {
      store.clearActions();
      auth.parseHash.mockReset();
    });

    it('should dispatch login success after successfully handling authentication', () => {
      auth.parseHash.mockImplementation(f => f(null, mockAuthResult)); // mock successful parseHash call
      jwtDecode.mockImplementation(idToken => mockDecodedIdTokenWithName);
      const expectedActions = [
        {
          type: types.HANDLE_AUTHENTICATION
        },
        {
          type: types.LOGIN_SUCCESS,
          accessToken: mockAuthResult.accessToken,
          expiresIn: mockAuthResult.expiresIn,
          userInfo: mockUserInfo
        }
      ];
      expect(auth.parseHash).not.toBeCalled();
      expect(jwtDecode).not.toBeCalled();
      store.dispatch(actions.handleAuthentication());
      expect(auth.parseHash).toBeCalled();
      expect(jwtDecode).toBeCalledWith(mockAuthResult.idToken);
      expect(store.getActions()).toEqual(expectedActions);
    });

    it(`should request user's name if blank after successfully handling authentication`, () => {
      auth.parseHash.mockImplementation(f => f(null, mockAuthResult)); // mock successful parseHash call
      jwtDecode.mockImplementation(idToken => mockDecodedIdTokenWithoutName);
      const expectedActions = [
        {
          type: types.HANDLE_AUTHENTICATION
        },
        {
          type: userTypes.REQUEST_NAME
        },
        {
          type: types.LOGIN_SUCCESS,
          accessToken: mockAuthResult.accessToken,
          expiresIn: mockAuthResult.expiresIn,
          userInfo: {
            ...mockUserInfo,
            name: undefined // we requested the name, but don't necessarily have it yet
          }
        }
      ];
      store.dispatch(actions.handleAuthentication());
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should call login failure if parsing the hash errors', () => {
      auth.parseHash.mockImplementation(f => f(mockError, null)); // mock unsuccessful parseHash call
      const expectedActions = [
        {
          type: types.HANDLE_AUTHENTICATION
        },
        {
          type: types.LOGIN_FAILURE,
          error: mockError
        }
      ];
      store.dispatch(actions.handleAuthentication());
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should call login failure if decoding the idToken errors', () => {
      auth.parseHash.mockImplementation(f => f(null, mockAuthResult));
      jwtDecode.mockImplementation(idToken => {
        throw mockError;
      });
      const expectedActions = [
        {
          type: types.HANDLE_AUTHENTICATION
        },
        {
          type: types.LOGIN_FAILURE,
          error: mockError
        }
      ];
      store.dispatch(actions.handleAuthentication());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('can logout', () => {
    const expectedAction = {
      type: types.LOGOUT
    };
    expect(actions.logout()).toEqual(expectedAction);
  });
});

describe('authentication reducer', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should adjust status on login request', () => {
    const expectedState = {
      ...initialState,
      status: mockAuthStatuses.requesting
    };
    expect(reducer(undefined, { type: types.LOGIN_REQUEST })).toEqual(
      expectedState
    );
  });

  it('should update state on login success', () => {
    utils.willExpireAt.mockImplementation(x => x);
    const expectedState = {
      ...initialState,
      accessToken: mockAuthResult.accessToken,
      expiresAt: utils.willExpireAt(mockAuthResult.expiresIn),
      status: mockAuthStatuses.success
    };

    utils.willExpireAt.mockClear();
    expect(utils.willExpireAt).not.toBeCalled();
    expect(
      reducer(undefined, {
        type: types.LOGIN_SUCCESS,
        accessToken: mockAuthResult.accessToken,
        expiresIn: mockAuthResult.expiresIn
      })
    ).toEqual(expectedState);
    expect(utils.willExpireAt).toBeCalledWith(mockAuthResult.expiresIn);
  });

  it('should adjust status on failed login', () => {
    const expectedState = {
      ...initialState,
      status: mockAuthStatuses.failure
    };
    expect(
      reducer(undefined, { type: types.LOGIN_FAILURE, error: mockError })
    ).toEqual(expectedState);
  });

  it('should reset to initial state on logout', () => {
    expect(reducer(undefined, { type: types.LOGOUT })).toEqual(initialState);
  });
});
