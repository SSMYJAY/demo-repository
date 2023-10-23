const express = require("express");
const secrett = require("crypto").randomBytes(64).toString("hex");

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "server running" });
});

require("./routes/routes.js")(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
