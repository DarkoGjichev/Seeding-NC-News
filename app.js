const express = require("express");
const app = express();
const db = require("./db/connection.js");

app.get("/api/topics", (req, res) => {
  return db.query("SELECT * FROM topics").then(({ rows: topics }) => {
    res.send({ topics });
  });
});

module.exports = app;
