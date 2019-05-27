import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../Actions/authenticationActions.js';
import TextInput from '../Inputs/TextInput.js';

import '../../App.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  };
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/profile'); // push to profile
    }
  };
  componentWillReceiveProps(newProps) {
    if (newProps.auth.isAuthenticated) {
      this.props.history.push('/profile');
    }
    if (newProps.errors) {
      this.setState({
        errors: newProps.errors
      });
    }
  };
  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };
  handleFormSubmit = event => {
    event.preventDefault();
    const loginData = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(loginData);
    this.props.loginUser(loginData);
  };

render() {
  const errors = this.state.errors;
  return (
    <div className="logIn">
      <div className="logInHeader">
        <h4><i className="fas fa-sign-in-alt" id="signlogIcon"/>{' '}Log In</h4>
        <p>Log in to your account</p>
      </div>
      <form onSubmit={this.handleFormSubmit}>
        <TextInput
          label="fas fa-envelope"
          name="email"
          placeholder="Email"
          type="email"
          value={this.state.email}
          onChange={this.handleInputChange}
          error={errors.email}
          />
        <TextInput
          label="fas fa-lock"
          name="password"
          placeholder="Password"
          type="password"
          value={this.state.password}
          onChange={this.handleInputChange}
          error={errors.password}
          />
        <button type="submit" className="submitFormButton" style={{fontFamily:"Muli"}}>Log In {' '} <i className="fas fa-location-arrow" /></button>
      </form>
    </div>
  )
};
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.authenticate,
  errors: state.errorMessages
});

export default connect(mapStateToProps, { loginUser })(Login);
