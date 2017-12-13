import { combineReducers } from 'redux';

import authenticationReducer from './authentication/authentication';

export default combineReducers({
  authentication: authenticationReducer
});
