// validates inputs for post model
const Validator = require('validator');
const isEmpty = require('./checkIfEmpty.js');

module.exports = function postvalidation(input) {
let errors = {};

input.title = !isEmpty(input.title) ? input.title : '';
input.text = !isEmpty(input.text) ? input.text : '';

if (!Validator.isLength(input.text, { min: 20, max: 2000})) {
  errors.text = 'Post must be at least 20 characters long and at max 2000';
}
if (Validator.isEmpty(input.title)) {
  errors.title = 'Title for your post is required';
}
if (Validator.isEmpty(input.text)) {
  errors.text = 'Text for your post is required';
}

return {
  errors,
  valid: isEmpty(errors)
}

};
