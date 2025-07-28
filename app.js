const express = require("express");
const app = express();
app.use(express.json());

const getAllTopics = require("./controllers/topics.controllers.js");
const {
  getAllArticles,
  getArticleById,
  updateVotesById,
} = require("./controllers/articles.controllers.js");
const getAllUsers = require("./controllers/users.controllers.js");
const {
  getCommentsByArticleId,
  addNewComment,
  deleteComment,
} = require("./controllers/comments.controllers.js");

app.get("/api/topics", getAllTopics);
app.get("/api/articles", getAllArticles);
app.get("/api/users", getAllUsers);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", addNewComment);

app.patch("/api/articles/:article_id", updateVotesById);

app.delete("/api/comments/:comment_id", deleteComment);

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
