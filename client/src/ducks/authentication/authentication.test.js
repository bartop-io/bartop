import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, { types, actions, initialState } from './authentication';

// authentication dependencies
// import entire objects instead of defaults so we can use jest.spyOn
import * as jwtDecodeModule from 'jwt-decode';
import auth from '../../singletons/authentication';
import * as utilsModule from '../../utils/utils';

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

  xit('should update state on login success', () => {
    const jwtDecode = jest.spyOn(jwtDecodeModule, 'default');
    jwtDecode.mockImplementation(s => s);
    const willExpireAt = jest.spyOn(utilsModule, 'willExpireAt');
    willExpireAt.mockImplementation(s => s);

    const authResult = {
      accessToken: '',
      idToken: '',
      expiresIn: 100
    };
    const expectedState = {
      ...initialState,
      accessToken: authResult.accessToken,
      idToken: authResult.idToken,
      expiresAt: authResult.expiresAt,
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
    expect(willExpireAt).toBeCalledWith(authResult.expiresAt);

    jwtDecode.mockRestore();
    willExpireAt.mockRestore();
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
