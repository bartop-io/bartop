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
import { CALL_API } from '../../middleware/call-api';
import { actions as modalActions, MODAL_TYPES } from '../modals/modals';

export const types = {
  LOGIN_SUCCESS: 'AUTHENTICATION/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'AUTHENTICATION/LOGIN_FAILURE',
  SEND_CODE_REQUEST: 'AUTHENTICATION/SEND_CODE_REQUEST',
  SEND_CODE_SUCCESS: 'AUTHENTICATION/SEND_CODE_SUCCESS',
  SEND_CODE_FAILURE: 'AUTHENTICATION/SEND_CODE_FAILURE',
  VERIFY_CODE_REQUEST: 'AUTHENTICATION/SEND_CODE_REQUEST',
  VERIFY_CODE_SUCCESS: 'AUTHENTICATION/VERIFY_CODE_SUCCESS',
  VERIFY_CODE_FAILURE: 'AUTHENTICATION/VERIFY_CODE_FAILURE',
  HANDLE_AUTHENTICATION: 'AUTHENTICATION/HANDLE_AUTHENTICATION',
  LOGOUT: 'AUTHENTICATION/LOGOUT'
};

export const actions = {
  loginSuccess: (accessToken, expiresIn, userInfo) => ({
    type: types.LOGIN_SUCCESS,
    accessToken,
    expiresIn,
    userInfo
  }),
  loginFailure: error => dispatch => {
    dispatch({
      type: types.LOGIN_FAILURE,
      error: serializeError(error)
    });
    dispatch(
      modalActions.showModal(MODAL_TYPES.LOGIN_FAILURE_MODAL, {
        error: serializeError(error)
      })
    );
  },
  sendCode: email => ({
    [CALL_API]: {
      types: [
        types.SEND_CODE_REQUEST,
        types.SEND_CODE_SUCCESS,
        types.SEND_CODE_FAILURE
      ],
      call: () =>
        // wrap Auth0 call in a promise so it can go through our call api middleware
        new Promise((resolve, reject) => {
          auth.passwordlessStart(
            {
              connection: 'email',
              send: 'code',
              email
            },
            (err, res) => {
              if (err) {
                reject(err.original.message);
              } else {
                resolve(res);
              }
            }
          );
        }),
      propagateFailure: true
    }
  }),
  verifyCode: (email, verificationCode) => ({
    [CALL_API]: {
      types: [
        types.VERIFY_CODE_REQUEST,
        types.VERIFY_CODE_SUCCESS,
        types.VERIFY_CODE_FAILURE
      ],
      call: () =>
        // wrap Auth0 call in a promise so it can go through our call api middleware
        new Promise((resolve, reject) => {
          auth.passwordlessLogin(
            {
              connection: 'email',
              email,
              verificationCode
            },
            (err, res) => {
              if (err) {
                reject(err);
              } else {
                resolve(res);
              }
            }
          );
        })
    }
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
