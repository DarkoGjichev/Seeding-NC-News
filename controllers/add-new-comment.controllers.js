const attachNewComment = require("../models/attach-new-comment.models");

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

module.exports = addNewComment;
