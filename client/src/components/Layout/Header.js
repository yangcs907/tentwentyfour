import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../Actions/authenticationActions.js';
import { clearCurrentProfile } from '../../Actions/profileActions.js';
import './layout.css';
import '../../App.css';

const activeStyle = {
  // color: "rgba(255,94,94,1)",
  // fontWeight: "bold"
  borderBottomStyle: "solid",
  borderColor: "rgba(255,94,94,1)",
  fontWeight: "bold"
};

class Header extends Component {
  logOut = (event) => {
    event.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();

  };
  render() {
    const isAuthenticated = this.props.auth.isAuthenticated;
    const user = this.props.auth.user;

    const aboutLink = (
      <NavLink to="/about" activeStyle={activeStyle} className="navLink">
        About
      </NavLink>
    );
    const signupLink = (
      <NavLink to="/signup" activeStyle={activeStyle} className="navLink">
        Sign Up
      </NavLink>
    );
    const loginLink = (
      <NavLink to="/login" activeStyle={activeStyle} className="navLink">
        Login
      </NavLink>
    );
    const logoutLink = (
      <a href="#" onClick={this.logOut} className="navLink">
        Logout
      </a>
    );
    const myProfileLink = (
      <NavLink to="/profile" activeStyle={activeStyle} className="navLink">
        My Profile
      </NavLink>
    );
    const profilesLink = (
      <NavLink to="/profiles" activeStyle={activeStyle} className="navLink">
        Browse Profiles
      </NavLink>
    );
    const postsLink = (
      <NavLink to="/posts" activeStyle={activeStyle} className="navLink">
        Posts
      </NavLink>
    );

    return (
      <div className="headerDiv">
        <nav>
          <div className="nav-wrapper">
            {aboutLink}
            {signupLink}
            {myProfileLink}
            {profilesLink}
            {postsLink}
            {isAuthenticated ? logoutLink : loginLink }
          </div>
        </nav>
      </div>
    )
  }
};

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.authenticate
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Header);
