const generateAccessToken = require("../utils/generateAccessToken");
const { check } = require("express-validator");

module.exports = (app) => {
  const auth = require("../controllers/auth.js");

  var router = require("express").Router();

  router.get("/login", auth.getLoginPage);

  router.get("/logout", function (request, response) {
    response.cookie("jwt", "", {
      expires: new Date(0),
      secure: process.env.NODE_ENV !== "development",
      httpOnly: false,
    });
    request.session.destroy(function (err) {
      response.redirect("/");
    });
  });

  router.get("/signup", auth.getSignupPage);

  router.post(
    "/login_process",
    check("email").notEmpty(),
    check("password").notEmpty(),
    auth.processLogin
  );

  router.post(
    "/signup_process",
    check("username").notEmpty().isLength({ min: 3, max: 20 }).trim().escape(),
    check("email").notEmpty().isEmail().normalizeEmail(),
    check("year").notEmpty().isNumeric().trim().escape(),
    check("major").notEmpty().isLength({ min: 1, max: 100 }).trim().escape(),
    check("gender").notEmpty().trim().escape(),
    check("password").notEmpty().escape(),
    check("confirmPassword").notEmpty().escape(),
    auth.processSignup
  );

  app.use("/auth", router);
};
