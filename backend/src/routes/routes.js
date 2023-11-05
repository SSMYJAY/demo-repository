const auth = require("../utils/auth");
const generateAccessToken = require("../utils/generateAccessToken");
const { check } = require("express-validator");

module.exports = (app) => {
  const basic = require("../controllers/controller.js");

  var router = require("express").Router();

  // Unprotected route (public)
  router.get("/", (req, res) => {
    res.json({ message: "server running" });
  });
  router.get("/test/:value", basic.getTest);
  router.get("/world/:value", basic.getConcat);

  // Protected routes
  router.get("/user", auth, basic.findCurrentUser);
  router.post("/user/bio", check("bio").notEmpty().escape(), basic.updateBio);

  // get access token
  router.post("/createNewUser", (req, res) => {
    const token = generateAccessToken({ username: req.body.username });
    res.json(token);
  });

  app.use("/api", router);
};
