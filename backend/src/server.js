const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const FileStore = require("session-file-store")(session);
const https = require("https");
const fs = require("fs");

var authCheck = require("./utils/authCheck.js");

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  session({
    secret: "~~~", // 원하는 문자 입력
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  })
);
app.use("/css", express.static(path.resolve("../public/styles")));
app.use("/scripts", express.static(path.resolve("../public/scripts")));

// example api routes
require("./routes/routes.js")(app);
// routes for user authorization
require("./routes/authRouter.js")(app);

app.get("/", (req, res) => {
  // if not logged in, redirect to the login page

  if (!authCheck.isOwner(req, res)) {
    res.redirect("/auth/login");
    return false;
  }

  // if logged in, redirect to the main page
  else {
    res.redirect("/main");
    return false;
  }
});

// main page

app.get("/main", (req, res) => {
  // if not logged in, redirect to the login page

  if (!authCheck.isOwner(req, res)) {
    res.redirect("/auth/login");
    return false;
  }

  // If the user is authenticated, it generates an HTML response.?
  res.sendFile(path.resolve("../public/question.html"));
  // var html = template.HTML(
  //   "Welcome",
  //   `<hr>
  //       <h2>Welcome to Main page!</h2>
  //       <p>Login Successful!</p>`,
  //   authCheck.statusUI(req, res)
  // );
  // res.send(html);
});

https
  .createServer(
    {
      key: fs.readFileSync("./key.pem"),
      cert: fs.readFileSync("./cert.pem"),
      passphrase: "krkr13",
    },
    app
  )
  .listen(port, () => {
    console.log(`app listening at https://localhost:${port}`);
  });
