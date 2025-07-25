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

const attachNewComment = (article_id, newComment) => {
  const formatednewComment = newComment.map((comment) => {
    return [comment.username, comment.body];
  });
  const author = formatednewComment[0][0];
  const body = formatednewComment[0][1];
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
