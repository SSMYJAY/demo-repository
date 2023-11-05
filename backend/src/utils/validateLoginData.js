// validation.js

function validateLoginData(data) {
  const { username, password } = data;
  let isValid = true;
  let warningMessage = "";

  // Username validation (only letters and numbers, at least 3 characters)
  if (!/^[a-zA-Z0-9]{3,}$/.test(username)) {
    warningMessage += "*Username or password does not match";
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
