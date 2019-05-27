// Actions for authentication
import { SET_CURRENT_USER, GET_ERROR_MESSAGES, CLEAR_CURRENT_USER } from './actionTypes.js';
import setAuthWebToken from '../utils/setAuthWebToken.js';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

// Set current user
export const setCurrentUser = (decodedToken) => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedToken
  }
};

// Signup user
export const signUpUser = (userData, history) => (dispatch) => {
  axios
    .post('/api/users/signup', userData)
    .then(res => {
      history.push('/login');
      let fullName = userData.firstName + " " + userData.lastName;
      alert(`Successfully created account for ${fullName}! You can now log in.`);
    })
    .catch(err => {
      dispatch({
        type: GET_ERROR_MESSAGES,
        payload: err.response.data
      })
    });
};

// Login user
export const loginUser = (userData) => (dispatch) => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      const webToken = res.data.token;
      localStorage.setItem('jwtToken', webToken);
      setAuthWebToken(webToken);
      const decodedToken = jwt_decode(webToken);
      dispatch(setCurrentUser(decodedToken));
    })
    .catch(err => {
      dispatch({
        type: GET_ERROR_MESSAGES,
        payload: err.response.data
      });
    });
};

// Logs out user
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthWebToken(false);
  dispatch(setCurrentUser({}));
  dispatch({
    type: CLEAR_CURRENT_USER
  })
};
