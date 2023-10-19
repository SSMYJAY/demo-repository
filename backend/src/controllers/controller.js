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

exports.findOneUser = (req, res) => {
  User.findById(req.params.user_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.user_id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.user_id,
        });
      }
    } else res.send(data);
  });
};
