const db = require("../db/connection.js");

const fetchAllUsers = () => {
  return db.query("SELECT * FROM users ").then(({ rows: users }) => {
    return users;
  });
};

module.exports = fetchAllUsers;
