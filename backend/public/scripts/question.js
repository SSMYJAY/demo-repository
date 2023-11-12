import { getCookie } from "./getCookie.js";

document
  .getElementById("checkbox-form")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission behavior
    const jwt = getCookie("jwt");

    // Get all checked checkboxes based on the "name" attribute
    const selectedCheckboxes = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

    // Extract the values from the checked checkboxes
    const selectedValues = Array.from(selectedCheckboxes).map(
      (checkbox) => checkbox.value
    );

    // Define the API endpoint and the request data
    const apiEndpoint = "/api/user/hashtag"; // Replace with your API endpoint
    const requestData = {
      selectedValues: selectedValues,
    };

    if (jwt) {
      // Include the token in the fetch request headers
      const headers = new Headers({
        Authorization: `${jwt}`,
        "Content-Type": "application/json",
      });

      // Make a POST request to the API using fetch
      fetch(apiEndpoint, {
        method: "POST",
        body: JSON.stringify(requestData),
        headers,
      })
        .then((response) => response.json())
        .then((data) => {
          if (window.confirm("Successfully updated preferences!")) {
            window.location.href = "/";
          } else {
            window.location.href = "/";
          }
          // Handle the API response as needed
        })
        .catch((error) => {
          console.error("API Error:", error);
          // Handle the error
        });
    } else {
      console.error("JWT token not found in cookie");
      window.location.href = "/auth/logout";
    }
  });
