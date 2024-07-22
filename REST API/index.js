const express = require("express");
const app = express();
const fs = require("fs");
const mongoose = require("mongoose");
const users = require("./MOCK_DATA.json");
const port = 8000;
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log("This is the middleware code");
  next();
});
app.get("/", (req, res) => {
  res.send("Homepage");
});
app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  const datum = users.find((user) => user.id == id);
  return res.json(datum);
});
app.post("/signup", (req, res) => {
  const body = { id: users.length + 1, body: req.body };
  users.push({ ...body });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "done" });
  });
});
app.listen(port, () => {
  console.log("Listening Port " + port);
});
