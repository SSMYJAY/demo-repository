const dotenv = require("dotenv");
const concat = require("../lib/concat/build/Release/concat");
const User = require("../models/users.model");

dotenv.config();

exports.getTest = (req, res) => {
  const value = req.params.value;

  const result = value;
  res.send(`Result: ${result}`);
};

exports.getConcat = (req, res) => {
  const value = req.params.value;

  const result = concat.world(value);
  res.send(`Result: ${result}`);
};

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
        username: data.id,
        major: data.major,
        year: data.year,
        gender: data.gender,
        bio: data.bio,
      });
  });
};

exports.updateBio = (req, res) => {
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
