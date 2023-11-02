const generateAccessToken = require("../utils/generateAccessToken");
const { check } = require("express-validator");

module.exports = (app) => {
  const auth = require("../controllers/auth.js");

  var router = require("express").Router();

  router.get("/login", auth.getLoginPage);

  router.get("/logout", function (request, response) {
    request.session.destroy(function (err) {
      response.redirect("/");
    });
  });

  router.get("/signup", auth.getSignupPage);

  router.post(
    "/login_process",
    check("username").notEmpty().isLength({ min: 3 }).trim().escape(),
    check("password").notEmpty().escape(),
    auth.processLogin
  );

  router.post(
    "/signup_process",
    check("username").notEmpty().isLength({ min: 3 }).trim().escape(),
    check("email").notEmpty().isEmail().normalizeEmail(),
    check("year").notEmpty().isNumeric().trim().escape(),
    check("major").notEmpty().trim().escape(),
    check("password").notEmpty().escape(),
    check("confirmPassword").notEmpty().escape(),
    auth.processSignup
  );

  app.use("/auth", router);
};
