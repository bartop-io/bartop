import { combineReducers } from 'redux';

import authenticationReducer from './authentication/authentication';
import userReducer from './user/user';
import modalsReducer from './modals/modals';

export default combineReducers({
  authentication: authenticationReducer,
  user: userReducer,
  modals: modalsReducer
});
