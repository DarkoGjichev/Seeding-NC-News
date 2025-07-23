const db = require("../db/connection.js");

const fetchCommentsByArticleId = (article_id) => {
  return db
    .query(
      "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC",
      [article_id]
    )
    .then(({ rows: comments }) => {
      console.log(comments);
      return comments;
    });
};

module.exports = fetchCommentsByArticleId;
