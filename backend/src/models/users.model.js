const db = require("./db.js");

const User = function (database) {};

User.findById = (user_id, result) => {
  db.query("SELECT * FROM ss_user WHERE user_id = ?", [user_id], (err, res) => {
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

module.exports = User;
