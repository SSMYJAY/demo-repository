const db = require("./db.js");

const User = function (database) {};

User.findById = (user_id, result) => {
  db.query("SELECT * FROM usertable WHERE id = ?", [user_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};

User.updateBio = (user_id, bio, result) => {
  db.query(
    "UPDATE usertable SET bio = ? WHERE id = ?",
    [bio, user_id],
    (err, res) => {
      console.log(res);
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.info) {
        console.log("updated bio: ", res);
        result(null, res);
        return;
      }

      // not found user with the id
      result({ kind: "not_found" }, null);
    }
  );
};

module.exports = User;
