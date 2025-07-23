const express = require("express");
const app = express();
const db = require("./db/connection.js");
const getAllTopics = require("./controllers/topics.controllers.js");

app.get("/api/topics", getAllTopics);

module.exports = app;
