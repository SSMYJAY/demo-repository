// validation.js

function validateSignupData(data) {
  const { username, email, major, year, password, confirmPassword } = data;
  let isValid = true;
  let warningMessage = "";

  // Username validation (only letters and numbers, at least 3 characters)
  if (!/^[a-zA-Z0-9]{3,}$/.test(username)) {
    warningMessage +=
      "*Username must contain at least 3 alphanumeric characters. ";
    isValid = false;
  }

  // Email validation (simple check for the presence of "@" symbol)
  if (!/@/.test(email)) {
    warningMessage += "*Please enter a valid email address. ";
    isValid = false;
  }

  // Major and Year validation (no specific format check)

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
