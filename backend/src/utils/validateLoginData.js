// validation.js

function validateLoginData(data) {
  const { email, password } = data;
  let isValid = true;
  let warningMessage = "";

  // Username validation (only letters and numbers, at least 3 characters)
  // Email validation (simple check for the presence of "@" symbol)
  if (!/@/.test(email)) {
    warningMessage += "*Please enter a valid email address. ";
    isValid = false;
  }

  // Password validation (at least 8 characters, 1 number, 1 special character, both uppercase and lowercase)
  if (
    password?.length < 8 ||
    !/(?=.*[0-9])(?=.*[!@#\$%^&*])(?=.*[a-z])(?=.*[A-Z])/.test(password)
  ) {
    if (isValid) {
      warningMessage += "*Username or password does not match";
      isValid = false;
    }
  }

  return { isValid, warningMessage };
}

module.exports = { validateLoginData };
