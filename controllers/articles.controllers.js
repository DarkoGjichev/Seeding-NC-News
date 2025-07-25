const {
  fetchAllArticles,
  fetchArticleById,
} = require("../models/articles.models");

const getAllArticles = (req, res) => {
  return fetchAllArticles().then((articles) => {
    res.status(200).send({ articles });
  });
};

const getArticleById = (req, res) => {
  const { article_id } = req.params;
  return fetchArticleById(article_id).then((article) => {
    res.status(200).send({ article });
  });
};

module.exports = { getAllArticles, getArticleById };
