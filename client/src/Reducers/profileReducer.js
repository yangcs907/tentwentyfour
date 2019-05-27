import { GET_CURRENT_USER_PROFILE, LOADING_PROFILE, CLEAR_CURRENT_USER_PROFILE, GET_ALL_PROFILES } from '../Actions/actionTypes.js';

const initialState = {
  currentUserProfile: null,
  profiles: null,
  loadingProfile: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case LOADING_PROFILE:
       return {
         ...state,
         loadingProfile: true
       }
    case GET_CURRENT_USER_PROFILE:
      return {
        ...state,
        currentUserProfile: action.payload,
        loadingProfile: false
      }
    case CLEAR_CURRENT_USER_PROFILE:
      return {
        ...state,
        currentUserProfile: null
      }
    case GET_ALL_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loadingProfile: false
      }
    default:
      return state;
  }
};
