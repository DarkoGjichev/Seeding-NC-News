const {
  fetchAllArticles,
  fetchArticleById,
} = require("../models/articles.models");

const getAllArticles = (req, res) => {
  fetchAllArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

const getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getAllArticles, getArticleById };
