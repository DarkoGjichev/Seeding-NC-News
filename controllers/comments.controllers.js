const { fetchArticleById } = require("../models/articles.models.js");
const {
  fetchCommentsByArticleId,
  attachNewComment,
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
  const sentComment = req.body;
  return attachNewComment(article_id, [sentComment]).then((postedComment) => {
    res.status(201).send({ postedComment });
  });
};

module.exports = { getCommentsByArticleId, addNewComment };
