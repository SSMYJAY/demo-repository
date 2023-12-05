// validation.js
const usernameValidator = require("../lib/usernameValidator/usernameValidator");
const genderValidator = require("../lib/genderValidator/genderValidator");
const majorValidator = require("../lib/majorValidator/majorValidator");

function validateSignupData(data) {
  const { username, email, major, year, gender, password, confirmPassword } =
    data;
  let isValid = true;
  let warningMessage = "";

  if (!usernameValidator.validate(username)) {
    warningMessage +=
      "*Username must contain between 3 and 20 alphanumeric characters. ";
    isValid = false;
  }

  // Email validation (simple check for the presence of "@" symbol)
  if (!/@/.test(email)) {
    if (isValid) {
      warningMessage += "*Please enter a valid email address. ";
      isValid = false;
    }
  }

  if (!majorValidator.validate(major)) {
    if (isValid) {
      warningMessage +=
        "*Your major contains characters other than alphabet or is too long. ";
      isValid = false;
    }
  }

  if (!genderValidator.validate(gender)) {
    if (isValid) {
      warningMessage += "*Please select a valid gender. ";
      isValid = false;
    }
  }

  // Password validation (at least 8 characters, 1 number, 1 special character, both uppercase and lowercase)
  if (password.length < 8) {
    warningMessage += "*Password must be at least 8 characters long. ";
    isValid = false;
  } else if (
    !/(?=.*[0-9])(?=.*[!@#\$%^&*])(?=.*[a-z])(?=.*[A-Z])/.test(password)
  ) {
    warningMessage +=
      "*Password must contain at least 1 number, 1 special character, and both uppercase and lowercase letters. ";
    isValid = false;
  } else if (password !== confirmPassword) {
    warningMessage += "*Passwords do not match. ";
    isValid = false;
  }

  return { isValid, warningMessage };
}

module.exports = { validateSignupData };
