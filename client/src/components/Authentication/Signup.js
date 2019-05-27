import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUpUser } from '../../Actions/authenticationActions.js';
import TextInput from '../Inputs/TextInput.js';

// import './authentication.css';
import '../../App.css';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      proPic: 'fas fa-user-ninja',
      password: '',
      confirmPassword: '',
      errors: {}
    }
  };

  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push('/home');
  //   }
  // };
  componentWillReceiveProps(newProps) {
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
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      email: this.state.email,
      proPic: this.state.proPic,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    this.props.signUpUser(newUser, this.props.history);
  };

  render() {
    const errors = this.state.errors;

    return (
      <div className="signUp">
        <div className="signUpHeader">
          <h4><i className="fas fa-user-plus" id="signlogIcon"/>{' '}Sign Up</h4>
          <p>Register a new account for Ten Twenty Four</p>
        </div>
        <form onSubmit={this.handleFormSubmit}>
          <TextInput
            label="fas fa-user-tag"
            name="firstName"
            placeholder="First Name"
            type="text"
            value={this.state.firstName}
            onChange={this.handleInputChange}
            error={errors.firstName}
            />
          <TextInput
            label="fas fa-user-tag"
            name="lastName"
            placeholder="Last Name"
            type="text"
            value={this.state.lastName}
            onChange={this.handleInputChange}
            error={errors.lastName}
            />
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
            label="fas fa-id-badge"
            name="username"
            placeholder="Username"
            type="text"
            value={this.state.username}
            onChange={this.handleInputChange}
            error={errors.username}
            />
          <TextInput
            label="fas fa-lock"
            name="password"
            placeholder="Create Password"
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            error={errors.password}
            />
          <TextInput
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            value={this.state.confirmPassword}
            onChange={this.handleInputChange}
            error={errors.confirmPassword}
            />
          <button type="submit" className="submitFormButton" style={{fontFamily:"Muli"}}>Sign Up {' '} <i className="fas fa-location-arrow" /></button>
        </form>
      </div>
    )
  }
};

Signup.propTypes = {
  signUpUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.authenticate,
  errors: state.errorMessages
});

export default connect(mapStateToProps, { signUpUser })(withRouter(Signup));
