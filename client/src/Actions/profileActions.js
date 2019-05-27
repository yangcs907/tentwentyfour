import axios from 'axios';
import { GET_CURRENT_USER_PROFILE, CLEAR_CURRENT_USER_PROFILE, GET_ERROR_MESSAGES, SET_CURRENT_USER, GET_ALL_PROFILES, LOADING_PROFILE } from './actionTypes.js';
// get current profile
export const getCurrentUserProfile = () => dispatch => {
  dispatch(loadingProfile());
  axios.get('/api/profile')
    .then(res => {
      dispatch({
        type: GET_CURRENT_USER_PROFILE,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_CURRENT_USER_PROFILE,
        payload: {}
      })
    })
};

// gets all profiles
export const getAllProfiles = () => dispatch => {
  dispatch(loadingProfile());
  axios
    .get('/api/profile/all-profiles')
    .then(res => {
      dispatch({
        type: GET_ALL_PROFILES,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ALL_PROFILES,
        payload: null
      })
    })
};

export const loadingProfile = () => (dispatch) => {
  dispatch({
    type: LOADING_PROFILE
  });
}
// clear profile
export const clearCurrentProfile = () => (dispatch) => {
  dispatch({
    type: CLEAR_CURRENT_USER_PROFILE
  });
};
