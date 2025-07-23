const fetchArticleById = require("../models/article-by-id.models");

const getArticleById = (req, res) => {
  const { article_id } = req.params;
  fetchArticleById(article_id).then((article_array) => {
    const article = article_array[0];
    res.status(200).send({ article });
  });
};

module.exports = getArticleById;
