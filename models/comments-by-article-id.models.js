const db = require("../db/connection.js");

const fetchCommentsByArticleId = (article_id) => {
  return db
    .query(
      "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC",
      [article_id]
    )
    .then(({ rows: comments }) => {
      if (comments.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No Comments found for this article",
        });
      }
      return comments;
    });
};

module.exports = fetchCommentsByArticleId;
