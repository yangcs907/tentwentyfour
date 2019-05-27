// Reducer for getting error messages
import { GET_ERROR_MESSAGES, CLEAR_ERROR_MESSAGES } from '../Actions/actionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_ERROR_MESSAGES:
      return action.payload
    case CLEAR_ERROR_MESSAGES:
      return {}
    default:
      return state;
  }
};
