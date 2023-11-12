import { getCookie } from "./getCookie.js";
import { category_noseparate } from "./category_noseparate.js";

function getTagsFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("user_id");
}

function decodeHtmlEntities(text) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

const userCardsContainer = document.querySelector(".friends");

window.addEventListener("load", () => {
  // Get the JWT token from the cookie
  const jwt = getCookie("jwt");

  if (jwt) {
    // Include the token in the fetch request headers
    const headers = new Headers({
      Authorization: `${jwt}`,
      "Content-Type": "application/json",
    });

    const user_id = getTagsFromURL();

    fetch(`/api/friend?user_id=${user_id}`, {
      method: "GET",
      headers,
    })
      .then((response) => response.json())
      .then((userData) => {
        // Update the username and bio on the page with fetched data
        const usernameElement = document.querySelector(".username");
        const bioElement = document.querySelector(".bio");
        const genderElement = document.querySelector(".gender");
        const yearElement = document.querySelector(".year");
        const majorElement = document.querySelector(".major");
        const registElement = document.querySelector(".registration_date");

        usernameElement.innerHTML = `<strong>${userData.username}</strong>`;
        bioElement.textContent =
          decodeHtmlEntities(userData.bio) || "Bio is empty!";
        genderElement.textContent = userData.gender;
        yearElement.textContent = userData.year;
        majorElement.textContent = userData.major;
        registElement.textContent =
          "Joined: " +
          new Date(userData.registration_date).toLocaleDateString();
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    fetch(`/api/friend/hashtag?user_id=${user_id}`, {
      method: "GET",
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        for (const hashtag of data.data) {
          const hashtagsDiv = document.querySelector(".hashtags");
          const hashtagSpan = document.createElement("span");
          hashtagSpan.className = "hashtag";
          hashtagSpan.textContent =
            "#" + category_noseparate[hashtag.tag_number];
          hashtagsDiv.appendChild(hashtagSpan);
        }
      })
      .catch((error) => {
        console.error("Error fetching hashtag data:", error);
      });

    fetch("/api/friends", {
      method: "GET",
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        const friendsList = data?.data;
        const isFriendOfUser = friendsList?.some(
          (friend) => friend.user_id == user_id
        );
        if (!isFriendOfUser) {
          const addFriendButton = document.querySelector(".add-friend-button");
          addFriendButton.style.display = "block";
        } else {
          const removeFriendButton = document.querySelector(
            ".remove-friend-button"
          );
          removeFriendButton.style.display = "block";
        }
      })
      .catch((error) => {
        console.error("Error getting friends: ", error);
      });
  } else {
    console.error("JWT token not found in cookie");
    window.location.href = "/auth/logout";
  }
});
