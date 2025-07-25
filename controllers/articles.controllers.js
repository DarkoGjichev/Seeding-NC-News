const {
  fetchAllArticles,
  fetchArticleById,
  changeVotesById,
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

const updateVotesById = (req, res) => {
  const { article_id } = req.params;
  return fetchArticleById(article_id).then(() => {
    const { inc_votes } = req.body;
    return changeVotesById(inc_votes, article_id).then((article) => {
      res.status(202).send({ article });
    });
  });
};

module.exports = { getAllArticles, getArticleById, updateVotesById };
