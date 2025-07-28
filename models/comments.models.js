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

const fetchCommentById = (comment_id) => {
  return db
    .query("SELECT * FROM comments WHERE comment_id = $1", [comment_id])
    .then(({ rows: comment }) => {
      if (comment.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment not found" });
      }
      return comment[0];
    });
};

const attachNewComment = (article_id, author, body) => {
  if (author === undefined || typeof author !== "string") {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  return db
    .query(
      "INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *",
      [article_id, author, body]
    )
    .then(({ rows }) => {
      const postedComment = rows[0];
      return postedComment;
    });
};

const removeComment = (comment_id) => {
  return db.query("DELETE FROM comments WHERE comment_id = $1", [comment_id]);
};

module.exports = {
  fetchCommentsByArticleId,
  attachNewComment,
  removeComment,
  fetchCommentById,
};
