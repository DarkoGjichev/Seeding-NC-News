const fetchCommentsByArticleId = require("../models/comments-by-article-id.models.js");

const getCommentsByArticleId = (req, res) => {
  const { article_id } = req.params;
  fetchCommentsByArticleId(article_id).then((comments) => {
    if (comments.length > 0) {
      res.status(200).send({ comments });
    } else {
      res.status(404).send({ message: "No comments not found" });
    }
  });
};

module.exports = getCommentsByArticleId;
