import { combineReducers } from 'redux';

import authenticationReducer from './authentication/authentication';
import userReducer from './user/user';

export default combineReducers({
  authentication: authenticationReducer,
  user: userReducer
});
