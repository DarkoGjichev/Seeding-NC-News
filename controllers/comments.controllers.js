const {
  fetchCommentsByArticleId,
  attachNewComment,
} = require("../models/comments.models.js");

const getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchCommentsByArticleId(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

const addNewComment = (req, res, next) => {
  const { article_id } = req.params;
  const sentComment = req.body;
  attachNewComment(article_id, [sentComment])
    .then((postedComment) => {
      res.status(201).send({ postedComment });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getCommentsByArticleId, addNewComment };
