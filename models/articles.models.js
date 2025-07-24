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

module.exports = fetchAllArticles;
