import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthWebToken from './utils/setAuthWebToken.js';
import { setCurrentUser, logoutUser } from './Actions/authenticationActions.js';
// import { clearCurrentProfile } from './Actions/profileActions.js';
import { Provider } from 'react-redux';
import store from './Store';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes.js';

import './App.css';

import Header from './components/Layout/Header.js';
import About from './components/Authentication/About.js';
import Signup from './components/Authentication/Signup.js';
import Login from './components/Authentication/Login.js';
import UserProfile from './components/Profile/UserProfile.js';


if (localStorage.jwtToken) {
  setAuthWebToken(localStorage.jwtToken);
  const decodedToken = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decodedToken));
  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    store.dispatch(logoutUser());
    // store.dispatch(clearCurrentProfile());
    window.location.href = "/login";
  }
};

class App extends Component {

  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Header />
            <div>
              <Route exact path = "/" component = { About } />
              <Route exact path = "/signup" component = { Signup } />
              <Route exact path = "/login" component = { Login } />
              <Switch>
                <PrivateRoutes exact path = "/profile" component = { UserProfile } />
              </Switch>
            </div>
          </div>
        </Router>

      </Provider>
    )
  }
};


export default App;
