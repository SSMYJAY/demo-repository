import { getCookie } from "./getCookie.js";

function getTagsFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("user_id");
}

const addFriendButton = document.querySelector(".add-friend-button");
addFriendButton.addEventListener("click", () => {
  const jwt = getCookie("jwt");
  const user_id = getTagsFromURL();

  if (jwt) {
    // Include the token in the fetch request headers
    const headers = new Headers({
      Authorization: `${jwt}`,
      "Content-Type": "application/json",
    });
    fetch(`/api/friends`, {
      method: "POST",
      headers,
      body: JSON.stringify({ friend_user_id: user_id }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (window.confirm("Friend added!")) {
          location.reload();
        } else {
          location.reload();
        }
      })
      .catch((error) => {
        console.error("Error sending friend request:", error);
      });
  } else {
    console.error("JWT token not found in cookie");
    window.location.href = "/auth/logout";
  }
});

const removeFriendButton = document.querySelector(".remove-friend-button");
removeFriendButton.addEventListener("click", () => {
  const jwt = getCookie("jwt");
  const user_id = getTagsFromURL();

  if (
    window.confirm(
      "Are you sure you want to remove this user from your friends list?"
    )
  ) {
    if (jwt) {
      // Include the token in the fetch request headers
      const headers = new Headers({
        Authorization: `${jwt}`,
        "Content-Type": "application/json",
      });
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
        })
        .catch((error) => {
          console.error("Error sending friend request:", error);
        });
    } else {
      console.error("JWT token not found in cookie");
      window.location.href = "/auth/logout";
    }
  } else {
  }
});
