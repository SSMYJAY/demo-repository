var express = require("express");
var router = express.Router();
var db = require("../models/db.js");
const bcrypt = require("bcrypt");
var path = require("path");
var authCheck = require("../utils/authCheck.js");
const { query, validationResult, check } = require("express-validator");
const { validateSignupData } = require("../utils/validateSignupData.js");
const { validateLoginData } = require("../utils/validateLoginData.js");

exports.getLoginPage = (req, res) => {
  if (authCheck.isOwner(req, res)) {
    res.redirect("/main");
    return false;
  }
  res.sendFile(path.resolve("../public/login.html"));
};

exports.getSignupPage = (req, res) => {
  if (authCheck.isOwner(req, res)) {
    res.redirect("/main");
    return false;
  }
  res.sendFile(path.resolve("../public/signup.html"));
};

exports.processSignup = (req, res) => {
  const result = validationResult(req);
  let data = {};

  if (result.isEmpty()) {
    data = req.body;
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Data is not valid!" });
  }

  const { isValid, warningMessage } = validateSignupData(data);

  if (!isValid) {
    return res.status(400).json({ success: false, message: warningMessage });
  } else {
    const { username, email, major, year, password, confirmPassword } = data;
    const password_e = bcrypt.hashSync(password, 10); // saltOrRounds: salt를 몇 번 돌릴건지.
    db.query(
      "SELECT * FROM userTable WHERE id = ?",
      [username],
      function (error, results, fields) {
        // The results of the query are handled in a callback function.?
        //

        if (error) {
          return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        }

        // if there is no same ID in DB, and Pw is same with PW2

        if (results.length <= 0 && password == confirmPassword) {
          db.query(
            "INSERT INTO usertable (id, password, email, major, year) VALUES(?,?,?,?,?)",
            [username, password_e, email, major, year],
            function (error, data) {
              if (error) throw error;
              return res.json({
                success: true,
                message: "Registration is Complete!",
              });
            }
          );
        }
        // if entered ID already exists in DB
        else {
          return res
            .status(400)
            .json({ success: false, message: "The ID already exists." });
        }
      }
    );
  }
};

exports.processLogin = (req, res) => {
  const result = validationResult(req);
  let data = {};

  if (result.isEmpty()) {
    data = req.body;
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Data is not valid!" });
  }

  const { isValid, warningMessage } = validateLoginData(data);

  if (!isValid) {
    return res.status(400).json({ success: false, message: warningMessage });
  } else {
    const { username, password } = data;
    db.query(
      "SELECT id, password FROM userTable WHERE id = ?",
      [username],
      function (error, results, fields) {
        //

        if (error) {
          return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        }

        // if entered ID exists in DB

        if (results.length > 0) {
          password_e_indb = results[0].password;
          const issame = bcrypt.compareSync(password, password_e_indb);

          // if entered PW is correct, update session information

          if (issame) {
            req.session.is_logined = true;
            req.session.nickname = username;
            res.json({ success: true, message: "Login successful!" });
          }

          // if entered PW is not correct
          else {
            res.status(400).json({
              success: false,
              message: "Username and password does not match!",
            });
          }
        }

        // if entered ID does not exist in DB
        else {
          res.status(400).json({
            success: false,
            message: "Username and password does not match!",
          });
        }
      }
    );
  }
};
