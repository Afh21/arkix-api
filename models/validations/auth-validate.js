const validator = require('validator');
const isEmpty = require('../validations/is-empty');

module.exports = {
   // Validation to auth/login
   login: data => {
      let errors = {};

      data.name = !isEmpty(data.name) ? data.name : '';
      data.email = !isEmpty(data.email) ? data.email : '';
      data.password = !isEmpty(data.password) ? data.password : '';

      if (!validator.isEmail(data.email)) {
         errors.email = 'Email is invalid.';
      }

      if (validator.isEmpty(data.name)) {
         errors.email = 'Name is required';
      }

      if (validator.isEmpty(data.email)) {
         errors.email = 'Email is required';
      }

      if (validator.isEmpty(data.password)) {
         errors.password = 'Password is required';
      }

      return { errors, isValid: isEmpty(errors) };
   },
   // Validation to auth/register
   register: data => {
      let errors = {};

      data.name = !isEmpty(data.name) ? data.name : ' ';
      data.email = !isEmpty(data.email) ? data.email : ' ';
      data.password = !isEmpty(data.password) ? data.password : ' ';

      if (validator.isEmpty(data.name)) {
         errors.name = '**Name field is required';
      }

      if (validator.isEmpty(data.email)) {
         errors.email = '**Email field is required';
      }

      if (validator.isEmpty(data.password)) {
         errors.password = '**Password field is required';
      }

      if (!validator.isLength(data.name, { min: 3, max: 30 })) {
         errors.name = 'Name must be between 3 and 30 characters';
      }

      if (!validator.isLength(data.password, { min: 8, max: 30 })) {
         errors.password = 'Password must be at least 8 characteres';
      }

      if (!validator.isEmail(data.email)) {
         errors.email = 'Email is invalid';
      }

      return { errors, isValid: isEmpty(errors) };
   }
};
