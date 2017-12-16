import auth from '../../singletons/authentication';
import history from '../../singletons/history';
import jwtDecode from 'jwt-decode';
import { willExpireAt } from '../../utils/utils';

export const types = {
  LOGIN_REQUEST: 'AUTHENTICATION/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'AUTHENTICATION/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'AUTHENTICATION/LOGIN_FAILURE',
  HANDLE_AUTHENTICATION: 'AUTHENTICATION/HANDLE_AUTHENTICATION',
  LOGOUT: 'AUTHENTICATION/LOGOUT'
};

export const actions = {
  loginRequest: () => {
    auth.authorize();
    return {
      type: types.LOGIN_REQUEST
    };
  },
  loginSuccess: authResult => ({
    type: types.LOGIN_SUCCESS,
    authResult
  }),
  loginFailure: error => ({
    type: types.LOGIN_FAILURE,
    error
  }),
  handleAuthentication: () => {
    // redux-thunk knows to handle action functions instead of normal action objects
    // this allows us to dispatch actions within actions, as well as access state
    return dispatch => {
      dispatch({
        type: types.HANDLE_AUTHENTICATION
      });
      auth.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          dispatch(actions.loginSuccess(authResult));
          history.replace('/');
        } else if (err) {
          console.error(err);
          dispatch(actions.loginFailure(err));
          // TODO - go somewhere for unauthenticated jawns
          history.replace('/');
        }
      });
    };
  },
  logout: () => ({ type: types.LOGOUT })
};

export const initialState = {
  accessToken: null,
  idToken: null,
  expiresAt: null,
  profile: null,
  status: {
    loggingIn: false,
    loggedIn: false,
    error: undefined
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        status: {
          ...state.status,
          loggingIn: true
        }
      };
    case types.LOGIN_SUCCESS:
      const { authResult } = action;
      const expiresAt = JSON.stringify(willExpireAt(authResult.expiresIn));

      return {
        ...state,
        accessToken: authResult.accessToken,
        idToken: authResult.idToken,
        expiresAt,
        profile: jwtDecode(authResult.idToken),
        status: {
          loggingIn: false,
          loggedIn: true,
          error: undefined
        }
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        status: {
          loggingIn: false,
          loggedIn: false,
          error: action.error
        }
      };
    case types.LOGOUT:
      // reset to the initial state upon logout
      return initialState;
    default:
      return state;
  }
};
