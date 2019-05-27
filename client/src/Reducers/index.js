// base rootReducer
import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer.js';
import profileReducer from './profileReducer.js';
import getErrorsReducer from './getErrorsReducer.js';

export default combineReducers({
  authenticate: authenticationReducer,
  errorMessages: getErrorsReducer,
  profile: profileReducer,
  // post: postReducer
});
