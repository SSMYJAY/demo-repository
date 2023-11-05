document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const warningText = document.querySelector(".warning-text");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;
    let warningMessage = "";

    const username = document.querySelector("#user").value;
    const password = document.querySelector("#password").value;

    // Username validation (only letters and numbers, at least 3 characters)
    if (!/^[a-zA-Z0-9]{3,}$/.test(username)) {
      warningMessage += "*Username or password does not match";
      isValid = false;
    }

    // Password validation (at least 8 characters, 1 number, 1 special character, both uppercase and lowercase)
    if (
      password.length < 8 ||
      !/(?=.*[0-9])(?=.*[!@#\$%^&*])(?=.*[a-z])(?=.*[A-Z])/.test(password)
    ) {
      if (isValid) {
        warningMessage += "*Username or password does not match";
        isValid = false;
      }
    }

    if (!isValid) {
      warningText.innerText = warningMessage;
    } else {
      const formData = {
        username,
        password,
      };
      fetch("/auth/login_process", {
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
            if (window.confirm("Login succesful!")) {
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
