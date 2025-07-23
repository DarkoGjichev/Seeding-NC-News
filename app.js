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

module.exports = app;
