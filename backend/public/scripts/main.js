import { getCookie } from "./getCookie.js";
import { category_noseparate } from "./category_noseparate.js";

function decodeHtmlEntities(text) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

function createUserCard(user) {
  const card = document.createElement("div");
  card.className = "user-card";
  card.innerHTML = `
          <a href="/profile?user_id=${user.user_id}"  style="color: black;"><img src="https://cdn.vectorstock.com/i/preview-1x/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg" alt="${user.username}">
          <h2>${user.username}</h2></a>
          <p><strong>Major:</strong> ${user.major}</p>
          <p><strong>Year:</strong> ${user.year}</p>
          <p><strong>Gender:</strong> ${user.gender}</p>
          <div class="hashtag-list class${user.user_id}">
          </div>
          <button class="remove-friend-button">Remove Friend</button>
      `;
  return card;
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

    fetch("/api/user", {
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
          decodeHtmlEntities(userData.bio) || "Your bio is empty!";
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

    fetch("/api/user/hashtag", {
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
        const friendsData = data.data;
        for (const friendData of friendsData) {
          const userCard = createUserCard(friendData);
          userCardsContainer.appendChild(userCard);
          const removeFriendButton = userCard.querySelector(
            ".remove-friend-button"
          );
          removeFriendButton.addEventListener("click", () => {
            // Make a POST fetch request with user_id as the request body
            if (
              window.confirm(
                `Are you sure you want to remove ${friendData.username} from your friends list?`
              )
            ) {
              const user_id = friendData.user_id;
              fetch(`/api/friends`, {
                method: "DELETE",
                headers,
                body: JSON.stringify({ friend_user_id: user_id }),
              })
                .then((response) => response.json())
                .then((result) => {
                  if (window.confirm("Friend removed!")) {
                    location.reload();
                  } else {
                    location.reload();
                  }

                  // You can add additional logic here, like showing a confirmation message.
                })
                .catch((error) => {
                  console.error("Error removing friend:", error);
                });
            }
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching hashtag data:", error);
      });
  } else {
    console.error("JWT token not found in cookie");
    window.location.href = "/auth/logout";
  }
});
