const { fetchArticleById } = require("../models/articles.models.js");
const {
  fetchCommentsByArticleId,
  attachNewComment,
  removeComment,
  fetchCommentById,
} = require("../models/comments.models.js");

const getCommentsByArticleId = (req, res) => {
  const { article_id } = req.params;
  return fetchArticleById(article_id).then((article_id) => {
    return fetchCommentsByArticleId(article_id).then((comments) => {
      res.status(200).send({ comments });
    });
  });
};

const addNewComment = (req, res) => {
  const { article_id } = req.params;
  return fetchArticleById(article_id).then(() => {
    const { username, body } = req.body;
    return attachNewComment(article_id, username, body).then(
      (postedComment) => {
        res.status(201).send({ postedComment });
      }
    );
  });
};

const deleteComment = (req, res) => {
  const { comment_id } = req.params;
  return fetchCommentById(comment_id).then(({ comment_id }) => {
    return removeComment(comment_id).then(() => {
      res.status(201).send();
    });
  });
};

module.exports = { getCommentsByArticleId, addNewComment, deleteComment };
