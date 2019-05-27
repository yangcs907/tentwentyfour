// validates inputs for profile routes
const Validator = require('validator');
const isEmpty = require('./checkIfEmpty.js');

module.exports = function profileValidation(input) {
  let errors = {};

  input.church = !isEmpty(input.church) ? input.church : '';
  input.briefTestimony = !isEmpty(input.briefTestimony) ? input.briefTestimony : '';
  input.location = !isEmpty(input.location) ? input.location : '';

  if (Validator.isEmpty(input.church)) {
    errors.church = 'Church field is required';
  }
  if (Validator.isEmpty(input.briefTestimony)) {
    errors.briefTestimony = 'A brief testimony is required';
  }
  if (Validator.isEmpty(input.location)) {
    errors.location = 'Location is required';
  }
  if (!isEmpty(input.youtube)) {
    if (!Validator.isURL(input.youtube)) {
      errors.youtube = 'Not valid URL'
    }
  }
  if (!isEmpty(input.twitter)) {
    if (!Validator.isURL(input.twitter)) {
      errors.twitter = 'Not valid URL'
    }
  }
  if (!isEmpty(input.facebook)) {
    if (!Validator.isURL(input.facebook)) {
      errors.facebook = 'Not valid URL'
    }
  }
  if (!isEmpty(input.linkedin)) {
    if (!Validator.isURL(input.linkedin)) {
      errors.linkedin = 'Not valid URL'
    }
  }
  if (!isEmpty(input.instagram)) {
    if (!Validator.isURL(input.instagram)) {
      errors.instagram = 'Not valid URL'
    }
  }
  if (!isEmpty(input.personalWebsite)) {
    if (!Validator.isURL(input.personalWebsite)) {
      errors.personalWebsite = 'Not valid URL'
    }
  }

  return {
    errors,
    valid: isEmpty(errors)
  }

};
