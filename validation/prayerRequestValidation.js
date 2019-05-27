// validates input for prayer request field
const Validator = require('validator');
const isEmpty = require('./checkIfEmpty.js');

module.exports = function prayerRequestValidation(input) {
  let errors = {};

  input.subject = !isEmpty(input.subject) ? input.subject : '';
  input.description = !isEmpty(input.description) ? input.description : '';

  if (Validator.isEmpty(input.subject)) {
    errors.subject = 'This field is required'
  }
  if (Validator.isEmpty(input.description)) {
    errors.description = 'A description is required'
  }

  return {
    errors,
    valid: isEmpty(errors)
  }
  
};
