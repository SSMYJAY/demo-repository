import { getCookie } from "./getCookie.js";
import { category_noseparate } from "./category_noseparate.js";

function getTagsFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("tags");
}

// Function to create user cards
function createUserCard(user, common_tags) {
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
          <button class="add-friend-button">Add Friend</button>
          <div class="already-friends-div">Already Friends!</div>
      `;
  return card;
}

function createHashtag(user_id, hashtags) {
  const hashtagsDiv = document.querySelector(`.hashtag-list.class${user_id}`);
  for (const hashtag of hashtags) {
    const hashtagSpan = document.createElement("span");
    hashtagSpan.className = "hashtag";
    hashtagSpan.textContent = "#" + category_noseparate[hashtag];
    hashtagsDiv.appendChild(hashtagSpan);
  }
}

const userCardsContainer = document.querySelector(".user-cards");

window.addEventListener("load", () => {
  // Extract tags from URL parameters
  const tags = getTagsFromURL();
  const jwt = getCookie("jwt");

  if (!tags) {
    console.error("Tags parameter is missing in the URL");
    return;
  }

  if (jwt) {
    // Include the token in the fetch request headers
    const headers = new Headers({
      Authorization: `${jwt}`,
      "Content-Type": "application/json",
    });

    let initFriendsList = [];

    fetch("/api/friends", {
      method: "GET",
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.data) {
          initFriendsList = data?.data;
        }
      })
      .catch((error) => {
        console.error("Error getting friends: ", error);
      });

    // Make an API request to retrieve friends with common tags
    fetch(`/api/friends-hashtag?tags=${tags}`, {
      method: "GET",
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        const friendlist = data.data;
        friendlist.sort((a, b) => b.common - a.common);

        // Use Promise.all to wait for all fetch requests to complete
        const fetchPromises = friendlist.map((user) => {
          return fetch(`/api/friend?user_id=${user.user_id}`, {
            method: "GET",
            headers,
          }).then((response) => response.json());
        });

        Promise.all(fetchPromises)
          .then((userDatas) => {
            // Sort the userDatas in the same order as friendlist
            userDatas.sort((a, b) => {
              const userA = friendlist.find(
                (user) => user.user_id === a.user_id
              );
              const userB = friendlist.find(
                (user) => user.user_id === b.user_id
              );
              return friendlist.indexOf(userA) - friendlist.indexOf(userB);
            });

            // Append sorted user cards
            userDatas.forEach((userData, index) => {
              const userCard = createUserCard(userData, friendlist[index].tags);
              userCardsContainer.appendChild(userCard);
              createHashtag(friendlist[index].user_id, friendlist[index].tags);
              const addFriendButton =
                userCard.querySelector(".add-friend-button");
              addFriendButton.addEventListener("click", () => {
                // Make a POST fetch request with user_id as the request body
                const user_id = friendlist[index].user_id;
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
              });

              const isFriendOfUser = initFriendsList?.some(
                (friend) => friend.user_id == friendlist[index].user_id
              );
              if (!isFriendOfUser) {
                addFriendButton.style.display = "block";
              } else {
                const alreadyFriendsDiv = userCard.querySelector(
                  ".already-friends-div"
                );
                alreadyFriendsDiv.style.display = "block";
              }
            });
          })
          .catch((error) => {
            console.error("Error fetching friends:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching friends:", error);
      });
  } else {
    console.error("JWT token not found in cookie");
    window.location.href = "/auth/logout";
  }
});
