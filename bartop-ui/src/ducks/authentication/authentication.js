import jwtDecode from 'jwt-decode';
import serializeError from 'serialize-error';

import auth, {
  nameClaim,
  loginsCountClaim
} from '../../singletons/authentication';
import history from '../../singletons/history';
import { willExpireAt } from '../../utils/utils';
import { actions as userActions } from '../user/user';
import bartopApi from '../../singletons/bartop-api';
import strings from '../../strings';

export const types = {
  START_LOGIN: 'AUTHENTICATION/START_LOGIN',
  LOGIN_SUCCESS: 'AUTHENTICATION/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'AUTHENTICATION/LOGIN_FAILURE',
  HANDLE_AUTHENTICATION: 'AUTHENTICATION/HANDLE_AUTHENTICATION',
  LOGOUT: 'AUTHENTICATION/LOGOUT'
};

export const actions = {
  startLogin: () => {
    history.push('/auth/login');
    return {
      type: types.START_LOGIN
    };
  },
  loginSuccess: (accessToken, expiresIn, userInfo) => ({
    type: types.LOGIN_SUCCESS,
    accessToken,
    expiresIn,
    userInfo
  }),
  loginFailure: error => {
    history.replace('/auth/failure');
    return {
      type: types.LOGIN_FAILURE,
      error: serializeError(error)
    };
  },
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
      };

      auth.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          try {
            const decodedIdToken = jwtDecode(authResult.idToken);
            // TODO - alter API singleton so it auto-syncs to redux state / local storage
            bartopApi.setToken(authResult.accessToken);

            const { email, phoneNumber } = decodedIdToken;
            const id = decodedIdToken.sub;
            const loginsCount = decodedIdToken[loginsCountClaim];
            const name = decodedIdToken[nameClaim];

            // Create the user in our db on their first login
            if (loginsCount === 1) {
              dispatch(userActions.create(id));
            }

            // Request their name until we get it
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
          errorOut(new Error(strings.errors.unknownDuringAuthentication));
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
  },
  sendCodeError: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.START_LOGIN:
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
