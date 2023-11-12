const db = require("./db.js");

const Friends = function (database) {};

Friends.getUserFriends = (user_id, result) => {
  db.query(
    "SELECT * FROM friends, user WHERE user.user_id = friends.friend_user_id AND friends.user_id = ?",
    [user_id],
    (err, res) => {
      if (err) {
        // console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        // console.log("found friends: ", res);
        result(null, res);
        return;
      } else {
        result({ kind: "not_found" }, null);
      }
    }
  );
};

Friends.insertFriend = (user_id, friend_user_id, result) => {
  db.query(
    "INSERT INTO friends (user_id, friend_user_id) VALUES (?,?) ON DUPLICATE KEY UPDATE user_id = user_id;",
    [user_id, friend_user_id],
    (err, res) => {
      if (err) {
        // console.log("error: ", err);
        result(err, null);
        return;
      } else {
        // console.log("rows inserted");
        result(null, null);
        return;
      }
    }
  );
};

Friends.deleteFriend = (user_id, friend_user_id, result) => {
  db.query(
    "DELETE FROM friends where user_id = ? AND friend_user_id = ?;",
    [user_id, friend_user_id],
    (err, res) => {
      if (err) {
        // console.log("error: ", err);
        result(err, null);
        return;
      } else {
        // console.log("rows deleted");
        result(null, null);
        return;
      }
    }
  );
};

module.exports = Friends;
