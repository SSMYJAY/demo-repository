var express = require("express");
var router = express.Router();
var db = require("../models/db.js");
const bcrypt = require("bcrypt");
var path = require("path");
var authCheck = require("../utils/authCheck.js");
const generateAccessToken = require("../utils/generateAccessToken");
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
    return res.json({ success: false, message: "Data is not valid!" });
  }

  const { isValid, warningMessage } = validateSignupData(data);

  if (!isValid) {
    return res.json({ success: false, message: warningMessage });
  } else {
    const { username, email, major, year, password, confirmPassword, gender } =
      data;
    const password_e = bcrypt.hashSync(password, 10); // saltOrRounds: salt를 몇 번 돌릴건지.
    db.query(
      "SELECT * FROM user WHERE email = ?;",
      [email],
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
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString().split("T")[0]; // Get the date portion

          db.query(
            "INSERT INTO user (username, password, email, major, year, gender, registration_date) VALUES(?,?,?,?,?,?,?)",
            [username, password_e, email, major, year, gender, formattedDate],
            function (error, data) {
              if (error) throw error;
              return res.json({
                success: true,
                message: "Registration is Complete!",
              });
            }
          );
        }
        // if entered email already exists in DB
        else {
          return res.json({
            success: false,
            message: "Email has already been registered!",
          });
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
    return res.json({ success: false, message: "Data is not valid!" });
  }

  const { isValid, warningMessage } = validateLoginData(data);

  if (!isValid) {
    return res.json({ success: false, message: warningMessage });
  } else {
    const { email, password } = data;
    db.query(
      "SELECT user_id, email, password FROM user WHERE email = ?",
      [email],
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
            const token = generateAccessToken({ username: results[0].user_id });
            req.session.is_logined = true;
            req.session.nickname = results[0].user_id;
            res.cookie("jwt", "", {
              expires: new Date(0),
              secure: process.env.NODE_ENV !== "development",
              httpOnly: false,
            });
            res.cookie("jwt", token, {
              secure: process.env.NODE_ENV !== "development",
              httpOnly: false,
              expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour expiration
            });

            res.json({
              success: true,
              message: "Login successful!",
              token: token,
            });
          }

          // if entered PW is not correct
          else {
            res.json({
              success: false,
              message: "Email and password does not match!",
            });
          }
        }

        // if entered email does not exist in DB
        else {
          res.json({
            success: false,
            message: "Email and password does not match!",
          });
        }
      }
    );
  }
};
