// validates input for prayer request field
const Validator = require('validator');
const isEmpty = require('./checkIfEmpty.js');

module.exports = function ministryExperienceValidation(input) {
  let errors = {};

  input.role = !isEmpty(input.role) ? input.role : '';
  input.description = !isEmpty(input.description) ? input.description : '';
  input.from = !isEmpty(input.from) ? input.from : '';

  if (Validator.isEmpty(input.role)) {
    errors.role = 'This field is required'
  }
  if (Validator.isEmpty(input.description)) {
    errors.description = 'A description is required'
  }
  if (Validator.isEmpty(input.from)) {
    errors.from = 'From date field is required'
  }

  return {
    errors,
    valid: isEmpty(errors)
  }

};
