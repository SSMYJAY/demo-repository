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

    if (jwt) {
      // Construct the new URL with the parameters
      const newURL = `/friends?tags=${selectedValues.join(",")}`;

      // Redirect to the new URL
      window.location.href = newURL;
    } else {
      console.error("JWT token not found in cookie");
      window.location.href = "/auth/logout";
    }
  });
