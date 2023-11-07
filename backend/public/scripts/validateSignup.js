document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const warningText = document.querySelector(".warning-text");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;
    let warningMessage = "";

    const username = document.querySelector("#user").value;
    const email = document.querySelector("#email").value;
    const major = document.querySelector("#major").value;
    const year = document.querySelector("#year").value;
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirm_password").value;
    const genderRadioButtons = document.querySelectorAll(
      'input[name="gender"]'
    );

    let selectedGender = null;
    let gender = null;

    for (const radioButton of genderRadioButtons) {
      if (radioButton.checked) {
        selectedGender = radioButton.id; // Get the ID of the selected radio button
        break;
      }
    }

    if (!selectedGender) {
      warningMessage += "*Please select a gender. ";
      isValid = false;
    } else {
      // Map the selected gender ID to the corresponding label
      const genderLabels = {
        "dot-1": "Male",
        "dot-2": "Female",
        "dot-3": "Other",
        "dot-4": "Prefer not to say",
      };
      gender = genderLabels[selectedGender];
    }

    // Username validation (only letters and numbers, 3 to 20 characters)
    if (!/^[a-zA-Z0-9 ]{3,20}$/.test(username)) {
      warningMessage +=
        "*Username must contain between 3 and 20 alphanumeric characters. ";
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

    if (!isValid) {
      warningText.innerText = warningMessage;
    } else {
      const formData = {
        username,
        email,
        major,
        year,
        gender,
        password,
        confirmPassword,
      };
      fetch("/auth/signup_process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Server response was not OK");
          }
        })
        .then((data) => {
          if (data.success) {
            if (
              window.confirm(
                "Registration is successful! Click OK to continue."
              )
            ) {
              window.location.href = "/";
            } else {
              window.location.href = "/";
            }
          } else {
            // Display an error message based on the server's response
            warningText.innerText = data.message;
          }
        })
        .catch((error) => {
          // Handle any fetch or server-side errors
          console.error("Error:", error);
        });
    }
  });
});
