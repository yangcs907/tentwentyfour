// validates server side inputs for sign up with User model
const Validator = require('validator');
const isEmpty = require('./checkIfEmpty.js');

module.exports = function signUpValidation(input) {
  let errors = {};

  input.firstName = !isEmpty(input.firstName) ? input.firstName : '';
  input.lastName = !isEmpty(input.lastName) ? input.lastName : '';
  input.username = !isEmpty(input.username) ? input.username : '';
  input.password = !isEmpty(input.password) ? input.password : '';
  input.confirmPassword = !isEmpty(input.confirmPassword) ? input.confirmPassword : '';

  if (!Validator.isLength(input.firstName, { min: 2, max: 30 })) {
    errors.firstName = 'First name must be between 2 and 30 characters';
  }
  if (!Validator.isLength(input.lastName, { min: 2, max: 30 })) {
    errors.lastName = 'First name must be between 2 and 30 characters';
  }
  if (Validator.isEmpty(input.firstName)) {
    errors.firstName = 'First name is required';
  }
  if (Validator.isEmpty(input.lastName)) {
    errors.lastName = 'Last name is required';
  }
  if (Validator.isEmpty(input.username)) {
    errors.username = 'Username is required';
  }
  if (!Validator.isLength(input.username, { min: 3, max: 20 })) {
    errors.username = 'Username must be between 3 and 20 characters';
  }
  if (Validator.isEmpty(input.email)) {
    errors.email = 'Email is required';
  }
  if (!Validator.isEmail(input.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(input.password)) {
    errors.password = 'Password is required';
  }
  if (!Validator.isLength(input.password, { min: 4, max: 30 })) {
    errors.password = 'Password must be between 4 and 30 characters';
  }
  if (!Validator.equals(input.password, input.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors,
    valid: isEmpty(errors)
  }

};
