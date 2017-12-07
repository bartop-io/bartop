import { combineReducers } from 'redux';

import appReducer from './app/app';
import authenticationReducer from './authentication/authentication';

export default combineReducers({
  app: appReducer,
  authentication: authenticationReducer
});
