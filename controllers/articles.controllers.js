const fetchAllArticles = require("../models/articles.models");

const getAllArticles = (req, res) => {
  fetchAllArticles().then((articles) => {
    res.status(200).send({ articles });
  });
};

module.exports = getAllArticles;
