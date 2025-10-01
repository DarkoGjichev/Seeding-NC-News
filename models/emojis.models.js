const db = require("../db/connection.js");

const fetchAllEmojis = () => {
  return db.query("SELECT * FROM emojis;").then(({ rows }) => {
    return rows;
  });
};

module.exports = { fetchAllEmojis };
