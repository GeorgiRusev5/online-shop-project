const PasswordValidator = require('password-validator');

function isEmpty(value) {
  return !value || value.trim() === "";
}

function userCredentialsAreValid(email, password) {
  return (
    email &&
    email.includes("@") &&
    password &&
    password.trim().length >= 8 &&
    password.trim().length <= 12
  );
}

function userDetailsAreValid(email, password, name, street, postal, city) {
  return (
    userCredentialsAreValid(email, password) &&
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(postal) &&
    postal.trim().length === 4 &&
    !isEmpty(city)
  );
}

function checkPasswordCorrectness(password){
  const schema = new PasswordValidator();
  schema
  .is().min(8)                                    // Minimum length 8
  .is().max(12)                                  // Maximum length 12
  .has().uppercase()                              // Must have uppercase letters
  .has().lowercase()                              // Must have lowercase letters
  .has().digits(1)                                // Must have at least 1 digits
  .has().symbols(1)                               // Must have at least 1 symbol
  .has().not().spaces()                           // Should not have spaces

  return schema.validate(password);
}

function passwordsAreConfirmed(password, confirmPassword) {
  return password === confirmPassword;
}

module.exports = {
  userDetailsAreValid: userDetailsAreValid,
  passwordsAreConfirmed: passwordsAreConfirmed,
  checkPasswordCorrectness: checkPasswordCorrectness
};
