import { getCookie } from "./getCookie.js";

function decodeHtmlEntities(text) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

window.addEventListener("load", () => {
  // Get the JWT token from the cookie
  const jwt = getCookie("jwt");

  if (jwt) {
    // Include the token in the fetch request headers
    const headers = new Headers({
      Authorization: `${jwt}`,
    });

    fetch("/api/user", {
      method: "GET",
      headers,
    })
      .then((response) => response.json())
      .then((userData) => {
        console.log(userData);
        // Update the username and bio on the page with fetched data
        const usernameElement = document.querySelector(".username");
        const bioElement = document.querySelector(".bio");
        const genderElement = document.querySelector(".gender");
        const yearElement = document.querySelector(".year");
        const majorElement = document.querySelector(".major");

        usernameElement.innerHTML = `<strong>${userData.username}</strong>`;
        bioElement.textContent =
          decodeHtmlEntities(userData.bio) || "Your bio is empty!";
        genderElement.textContent = userData.gender;
        yearElement.textContent = userData.year;
        majorElement.textContent = userData.major;
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  } else {
    console.error("JWT token not found in cookie");
    window.location.href = "/auth/logout";
  }
});
