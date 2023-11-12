const { validationResult } = require("express-validator");
const dotenv = require("dotenv");
const User = require("../models/users.model");
const UserHashtag = require("../models/userhashtag.model");
const Friends = require("../models/friends.model");

dotenv.config();

exports.findCurrentUser = (req, res) => {
  User.findById(req.session.nickname, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.session.nickname}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.session.nickname,
        });
      }
    } else
      res.send({
        success: true,
        user_id: data.user_id,
        username: data.username,
        major: data.major,
        year: data.year,
        gender: data.gender,
        bio: data.bio,
        registration_date: data.registration_date,
      });
  });
};

exports.findUser = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  User.findById(req.query.user_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.query.user_id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.query.user_id,
        });
      }
    } else
      res.send({
        success: true,
        user_id: data.user_id,
        username: data.username,
        major: data.major,
        year: data.year,
        gender: data.gender,
        bio: data.bio,
        registration_date: data.registration_date,
      });
  });
};

exports.updateBio = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  if (!req.session.nickname) {
    return res.status(400).json({ success: false, message: "no user" });
  }
  User.updateBio(req.session.nickname, req.body.bio, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.session.nickname}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating bio of user " + req.session.nickname,
        });
      }
    } else
      res.send({
        success: true,
        bio: req.body.bio,
      });
  });
};

exports.getUserHashtags = (req, res) => {
  if (!req.session.nickname) {
    return res.status(400).json({ success: false, message: "no user" });
  }
  UserHashtag.getUserHashtags(req.session.nickname, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found hashtag with user id ${req.session.nickname}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving hashtag with user id " + req.session.nickname,
        });
      }
    } else
      res.send({
        success: true,
        data: data,
      });
  });
};

exports.getOtherUserHashtags = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  UserHashtag.getUserHashtags(req.query.user_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found hashtag with user id ${req.session.nickname}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving hashtag with user id " + req.session.nickname,
        });
      }
    } else
      res.send({
        success: true,
        data: data,
      });
  });
};

exports.updateUserHashtag = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  if (!req.session.nickname) {
    return res.status(400).json({ success: false, message: "no user" });
  }

  const selectedTags = req.body.selectedValues;

  // Function to delete hashtags
  const deleteHashtags = (selectedTag) => {
    return new Promise((resolve, reject) => {
      UserHashtag.deleteHashtag(
        req.session.nickname,
        selectedTag,
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
            } else {
              reject({
                status: 500,
                message:
                  "Error deleting hashtag of user " + req.session.nickname,
              });
            }
          } else {
            resolve();
          }
        }
      );
    });
  };

  // Function to insert hashtags
  const insertHashtags = (selectedTag) => {
    return new Promise((resolve, reject) => {
      UserHashtag.insertHashtag(
        req.session.nickname,
        selectedTag,
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
            } else {
              reject({
                status: 500,
                message:
                  "Error inserting hashtag of user " + req.session.nickname,
              });
            }
          } else {
            resolve();
          }
        }
      );
    });
  };

  // Perform delete and insert operations
  try {
    for (const selectedTag of selectedTags) {
      await deleteHashtags(selectedTag);
    }
    for (const selectedTag of selectedTags) {
      await insertHashtags(selectedTag);
    }
    res.send({
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

exports.getPotentialFriends = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!req.session.nickname) {
    return res.status(400).json({ success: false, message: "no user" });
  }

  const tagsParam = req.query.tags;
  if (!tagsParam) {
    return res.status(400).json({ error: "Tags parameter missing" });
  }

  const tags = tagsParam.split(",");

  UserHashtag.getPotentialFriends(req.session.nickname, tags, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).json({
          message: `Not found hashtag with user id ${req.session.nickname}.`,
        });
      } else {
        return res.status(500).json({
          message:
            "Error retrieving hashtag with user id " + req.session.nickname,
        });
      }
    } else {
      // Create an object to store users and their common tag counts
      let userCommonTagCounts = {};

      const userHashtags = data;

      // Iterate through the tags
      tags.forEach((tag) => {
        userHashtags.forEach((userHashtag) => {
          if (userHashtag.tag_number === tag) {
            const userID = userHashtag.user_id;

            if (!userCommonTagCounts[userID]) {
              userCommonTagCounts[userID] = {
                user_id: userID,
                common: 1,
                tags: [tag],
              };
            } else {
              userCommonTagCounts[userID].common += 1;
              userCommonTagCounts[userID].tags.push(tag);
            }
          }
        });
      });

      // Convert the object into an array of userCommonTagCounts
      const resultArray = Object.values(userCommonTagCounts);

      res.json({ success: true, data: resultArray });
    }
  });
};

exports.insertFriend = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!req.session.nickname) {
    return res.status(400).json({ success: false, message: "no user" });
  }
  Friends.insertFriend(
    req.session.nickname,
    req.body.friend_user_id,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.session.nickname}.`,
          });
        } else {
          res.status(500).send({
            message: "Error inserting friend of user " + req.session.nickname,
          });
        }
      } else
        res.send({
          success: true,
          friend_user_id: req.body.friend_user_id,
        });
    }
  );
};

exports.deleteFriend = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!req.session.nickname) {
    return res.status(400).json({ success: false, message: "no user" });
  }
  Friends.deleteFriend(
    req.session.nickname,
    req.body.friend_user_id,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.session.nickname}.`,
          });
        } else {
          res.status(500).send({
            message: "Error deleting friend of user " + req.session.nickname,
          });
        }
      } else
        res.send({
          success: true,
          friend_user_id: req.body.friend_user_id,
        });
    }
  );
};

exports.getCurrentUserFriends = (req, res) => {
  Friends.getUserFriends(req.session.nickname, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found friends with user id ${req.session.nickname}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving friends of user id " + req.session.nickname,
        });
      }
    } else
      res.send({
        success: true,
        data: data,
      });
  });
};
