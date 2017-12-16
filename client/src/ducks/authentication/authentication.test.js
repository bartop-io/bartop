import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, { types, actions, initialState } from './authentication';

// import & mock authentication's dependencies so we can spy on functions
import jwtDecode from 'jwt-decode';
import auth from '../../singletons/authentication';
import { willExpireAt } from '../../utils/utils';

jest.mock('jwt-decode', () => jest.fn(x => x));

jest.mock('../../utils/utils', () => ({
  willExpireAt: jest.fn(x => x)
}));

describe('authentication actions', () => {
  it('should call auth authorize when requesting login', () => {
    const authorize = jest.spyOn(auth, 'authorize').mockImplementation(x => x);
    const expectedAction = {
      type: types.LOGIN_REQUEST
    };
    expect(authorize).not.toBeCalled();
    const action = actions.loginRequest();
    expect(action).toEqual(expectedAction);
    expect(authorize).toBeCalled();
  });

  it('should call login success with result of authentication', () => {
    const authResult = {
      token: 'token',
      profile: 'profile'
    };
    const expectedAction = {
      type: types.LOGIN_SUCCESS,
      authResult
    };
    const action = actions.loginSuccess(authResult);
    expect(action).toEqual(expectedAction);
  });

  it('should fail login with an error', () => {
    const error = 'the login failed';
    const expectedAction = {
      type: types.LOGIN_FAILURE,
      error
    };
    const action = actions.loginFailure(error);
    expect(action).toEqual(expectedAction);
  });

  describe('handle authentication action', () => {
    let store, parseHash;

    beforeAll(() => {
      store = configureMockStore([thunk])();
      parseHash = jest.spyOn(auth, 'parseHash');
    });

    afterEach(() => {
      store.clearActions();
      parseHash.mockReset();
    });

    it('should call login success after successfully handling authentication', () => {
      const mockAuthResult = {
        accessToken: 'accessToken',
        idToken: 'idToken'
      };
      parseHash.mockImplementation(f => f(null, mockAuthResult)); // mock successful parseHash call
      const expectedActions = [
        {
          type: types.HANDLE_AUTHENTICATION
        },
        {
          type: types.LOGIN_SUCCESS,
          authResult: mockAuthResult
        }
      ];
      expect(parseHash).not.toBeCalled();
      store.dispatch(actions.handleAuthentication());
      expect(parseHash).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should call login failure if handling authentication errors', () => {
      const mockError = {};
      parseHash.mockImplementation(f => f(mockError, null)); // mock unsuccessful parseHash call
      const expectedActions = [
        {
          type: types.HANDLE_AUTHENTICATION
        },
        {
          type: types.LOGIN_FAILURE,
          error: mockError
        }
      ];
      expect(parseHash).not.toBeCalled();
      store.dispatch(actions.handleAuthentication());
      expect(parseHash).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should logout', () => {
    const expectedAction = {
      type: types.LOGOUT
    };
    expect(actions.logout()).toEqual(expectedAction);
  });
});

describe('authentication reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should adjust status on login request', () => {
    const expectedState = {
      ...initialState,
      status: {
        ...initialState.status,
        loggingIn: true
      }
    };
    expect(reducer(undefined, { type: types.LOGIN_REQUEST })).toEqual(
      expectedState
    );
  });

  it('should update state on login success', () => {
    const authResult = {
      accessToken: '',
      idToken: '',
      expiresIn: 100
    };
    const expectedState = {
      ...initialState,
      accessToken: authResult.accessToken,
      idToken: authResult.idToken,
      expiresAt: JSON.stringify(authResult.expiresIn),
      profile: authResult.idToken,
      status: {
        loggingIn: false,
        loggedIn: true,
        error: undefined
      }
    };

    expect(jwtDecode).not.toBeCalled();
    expect(willExpireAt).not.toBeCalled();
    expect(
      reducer(undefined, { type: types.LOGIN_SUCCESS, authResult })
    ).toEqual(expectedState);
    expect(jwtDecode).toBeCalledWith(authResult.idToken);
    expect(willExpireAt).toBeCalledWith(authResult.expiresIn);

    jest.resetModules();
  });

  it('should adjust status on failed login', () => {
    const action = { type: types.LOGIN_FAILURE, error: {} };
    const expectedState = {
      ...initialState,
      status: {
        loggingIn: false,
        loggedIn: false,
        error: action.error
      }
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('should reset to initial state on logout', () => {
    expect(reducer(undefined, { type: types.LOGOUT })).toEqual(initialState);
  });
});
