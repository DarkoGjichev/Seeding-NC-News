const db = require("../db/connection.js");

const fetchAllArticles = () => {
  return db
    .query(
      "SELECT a.article_id, a.title, a.topic, a.author, a.created_at, a.votes, a.article_img_url, COUNT(c.comment_id) AS comment_count FROM articles a LEFT JOIN comments c ON c.article_id = a.article_id GROUP BY a.article_id ORDER BY a.created_at DESC;"
    )
    .then(({ rows: articles }) => {
      return articles;
    });
};

const fetchArticleById = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article Not Found" });
      }
      const article = rows[0];
      return article;
    });
};

const changeVotesById = (inc_votes, article_id) => {
  if (inc_votes === undefined || typeof inc_votes !== "number") {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  return db
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *",
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      const article = rows[0];
      return article;
    });
};

module.exports = { fetchAllArticles, fetchArticleById, changeVotesById };
