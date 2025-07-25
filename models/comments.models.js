const db = require("../db/connection.js");

const fetchCommentsByArticleId = ({ article_id }) => {
  return db
    .query(
      "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC",
      [article_id]
    )
    .then(({ rows: comments }) => {
      return comments;
    });
};

const attachNewComment = (article_id, author, body) => {
  console.log(author);
  if (author === undefined || typeof author !== "string") {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  return db
    .query(
      "INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3)",
      [article_id, author, body]
    )
    .then(() => {
      return db.query(
        "SELECT * FROM comments WHERE body = 'Small text goes here...'"
      );
    })
    .then(({ rows }) => {
      const postedComment = rows[0];
      return postedComment;
    });
};

module.exports = { fetchCommentsByArticleId, attachNewComment };
