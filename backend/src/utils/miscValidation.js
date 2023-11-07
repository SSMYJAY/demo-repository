const { validationResult, check } = require("express-validator");

// Custom validation function to check if an array consists of strings
const isArrayOfString = (value) => {
  if (!Array.isArray(value)) {
    return false;
  }

  for (const item of value) {
    if (typeof item !== "string") {
      return false;
    }
  }

  return true;
};

module.exports = {
  validateArrayOfString: (paramName) => {
    return [check(paramName).custom(isArrayOfString)];
  },
};
