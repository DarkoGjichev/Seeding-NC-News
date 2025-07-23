const fetchArticleById = require("../models/article-by-id.models");

const getArticleById = (req, res) => {
  const { article_id } = req.params;
  fetchArticleById(article_id).then((article_array) => {
    if (article_array.length === 1) {
      const article = article_array[0];
      res.status(200).send({ article });
    } else {
      res.status(404).send({ message: "Article not found" });
    }
  });
};

module.exports = getArticleById;
