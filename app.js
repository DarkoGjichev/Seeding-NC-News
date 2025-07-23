const express = require("express");
const app = express();
const db = require("./db/connection.js");

app.get("/api", (req, res) => res.send("Hello World!"));
