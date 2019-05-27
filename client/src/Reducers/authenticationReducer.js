// reducer for authenticating user
import isEmpty from '../validation/checkIfEmpty.js';
import { SET_CURRENT_USER, CLEAR_CURRENT_USER } from '../Actions/actionTypes.js';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    case CLEAR_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: false
      }
    default:
      return state;
  }
};
