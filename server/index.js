const express = require("express");
const path = require("path");
require("dotenv").config();
const connect = require("./configs/db");
const userController = require("./controllers/user.controller");
const bookController = require("./controllers/book.controller");
const PORT = process.env.port || 5000;

const app = express();
app.use(express.json());

app.use("/user", userController);
app.use("/book", bookController);

app.use(express.static(path.join(__dirname, "../bookstore/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "../frontend/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`Listening at ${PORT}`);
  } catch (e) {
    console.log(e.message);
  }
});
