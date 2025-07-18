const devData = require("./db/data/development-data/index.js");
const db = require("./db/connection.js");

const validate = (devData) => {
  return db
    .query(`SELECT * FROM users`)
    .then((data) => {
      console.log(data.rows);
    })
    .then(() => {
      return db.query(`SELECT title FROM articles WHERE topic = 'coding'`);
    })
    .then((data) => {
      console.log(data.rows);
    })
    .then(() => {
      return db.query(`SELECT * FROM comments WHERE votes < 0`);
    })
    .then((data) => {
      console.log(data.rows);
    })
    .then(() => {
      return db.query(`SELECT * FROM topics`);
    })
    .then((data) => {
      console.log(data.rows);
    })
    .then(() => {
      return db.query(`SELECT * FROM articles WHERE author = 'grumpy19'`);
    })
    .then((data) => {
      console.log(data.rows);
    })
    .then(() => {
      return db.query(`SELECT * FROM comments WHERE votes > 10`);
    })
    .then((data) => {
      console.log(data.rows);
    });
};

validate();
console.log("end of page");
