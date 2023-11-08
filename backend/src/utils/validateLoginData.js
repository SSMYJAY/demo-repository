// validation.js
const emailValidator = require("../lib/emailValidator/emailValidator");
const passwordValidator = require("../lib/passwordValidator/passwordValidator");

function validateLoginData(data) {
  const { email, password } = data;
  let isValid = true;
  let warningMessage = "";

  // Email validation (simple check for the presence of "@" symbol)
  // if (!/@/.test(email)) {
  //   warningMessage += "*Please enter a valid email address. ";
  //   isValid = false;
  // }
  if (!emailValidator.validate(email)) {
    warningMessage += "*Please enter a valid email address.";
    isValid = false;
  }

  if (!passwordValidator.validate(password)) {
    if (isValid) {
      warningMessage += "*Email or password (invalid) does not match";
      isValid = false;
    }
  }

  return { isValid, warningMessage };
}

module.exports = { validateLoginData };
