const express = require("express");
const app = express();
const db = require("./db/connection.js");
const getAllTopics = require("./controllers/topics.controllers.js");
const getAllArticles = require("./controllers/articles.controllers.js");
const getAllUsers = require("./controllers/users.controllers.js");
const getArticleById = require("./controllers/article-by-id.controllers.js");
const getCommentsByArticleId = require("./controllers/comments-by-article-id.controllers.js");

app.get("/api/topics", getAllTopics);
app.get("/api/articles", getAllArticles);
app.get("/api/users", getAllUsers);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.use((req, res) => {
  res.status(404).send({ msg: "Path Not Found" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
