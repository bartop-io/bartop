import jwtDecode from 'jwt-decode';

import auth from '../../singletons/authentication';
import history from '../../singletons/history';
import config from '../../config';
import { willExpireAt } from '../../utils/utils';
import { actions as userActions } from '../user/user';

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
  loginSuccess: (accessToken, expiresIn, userInfo) => ({
    type: types.LOGIN_SUCCESS,
    accessToken,
    expiresIn,
    userInfo
  }),
  loginFailure: error => ({
    type: types.LOGIN_FAILURE,
    error
  }),
  handleAuthentication: () =>
    // redux-thunk knows to handle action functions instead of normal action objects
    // this allows us to dispatch actions within actions, as well as access state
    (dispatch, getState) => {
      dispatch({
        type: types.HANDLE_AUTHENTICATION
      });

      // shorthand for when we encounter an error during this authentication process
      const errorOut = err => {
        console.error(err);
        dispatch(actions.loginFailure(err));
        // TODO - go somewhere for failure or unauthenticated jawns
        history.replace('/');
      };

      auth.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          try {
            const decodedIdToken = jwtDecode(authResult.idToken);
            const { email, phoneNumber } = decodedIdToken;
            const id = decodedIdToken.sub;
            let name = decodedIdToken[`${config.auth0.claimNamespace}/name`];
            if (!name) {
              dispatch(userActions.requestName());
            }
            const userInfo = {
              id,
              name,
              email,
              phoneNumber
            };
            dispatch(
              actions.loginSuccess(
                authResult.accessToken,
                authResult.expiresIn,
                userInfo
              )
            );
            history.replace('/');
          } catch (err) {
            errorOut(err);
          }
        } else if (err) {
          errorOut(err);
        } else {
          errorOut({
            message: 'An unknown error occurred while authenticating'
          });
        }
      });
    },
  logout: () => ({ type: types.LOGOUT })
};

export const initialState = {
  accessToken: null,
  expiresAt: null,
  status: {
    loggingIn: false,
    loggedIn: false,
    error: null
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
      const { accessToken, expiresIn } = action;
      const expiresAt = willExpireAt(expiresIn);

      return {
        ...state,
        accessToken,
        expiresAt,
        status: {
          loggingIn: false,
          loggedIn: true,
          error: null
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
