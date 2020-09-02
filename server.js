"use strict";

const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();
// require and use "multer"...

const app = express();
const uploads = multer({ dest: "uploads/" });

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
//app.use()

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/hello", function (req, res) {
  res.json({ greetings: "Hello, API" });
});

app.post(
  "/api/fileanalyse",
  uploads.single("upfile"),
  async (req, res, next) => {
    const { fieldname: name, mimetype: type, size } = req.file;
    try {
      res.json({ name, type, size });
    } catch (error) {
      next(error);
    }
  }
);

app.listen(process.env.PORT || 3000, function () {
  console.log("Node.js listening ...");
});
