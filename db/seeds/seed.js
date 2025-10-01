const db = require("../connection");
var format = require("pg-format");
const { convertTimestampToDate, createLookupRef } = require("./utils.js");
const tableQueries = require("./create-tables-queries.js");

const seed = ({ topicData, userData, articleData, commentData, emojiData }) => {
  return db
    .query(tableQueries)
    .then(() => {
      const formattedData = topicData.map((topic) => {
        return [topic.description, topic.slug, topic.img_url];
      });
      const topicsData = format(
        `INSERT INTO topics (description, slug, img_url)
      VALUES %L
      RETURNING *;`,
        formattedData
      );
      return db.query(topicsData);
    })
    .then(() => {
      const formattedData = userData.map((user) => {
        return [user.username, user.name, user.avatar_url];
      });
      const usersData = format(
        `INSERT INTO users (username, name, avatar_url)
      VALUES %L
      RETURNING *;`,
        formattedData
      );
      return db.query(usersData);
    })
    .then(() => {
      const formattedData = articleData.map((article) => {
        return [
          article.title,
          article.topic,
          article.author,
          article.body,
          new Date(article.created_at),
          article.votes,
          article.article_img_url,
        ];
      });
      const articlesData = format(
        `INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url)
      VALUES %L
      RETURNING *;`,
        formattedData
      );
      return db.query(articlesData);
    })
    .then(({ rows: articles }) => {
      const ref = createLookupRef(articles, "title", "article_id");
      const formattedData = commentData.map((comment) => {
        return [
          ref[comment.article_title],
          comment.body,
          comment.votes,
          comment.author,
          new Date(comment.created_at),
        ];
      });
      const commentsData = format(
        `INSERT INTO comments (article_id, body, votes, author,created_at)
      VALUES %L
      RETURNING *;`,
        formattedData
      );
      return db.query(commentsData);
    })
    .then(() => {
      const formattedData = emojiData.map((emoji) => {
        return [emoji.slug, emoji.symbol, emoji.description];
      });
      const emojisData = format(
        `INSERT INTO emojis (slug, symbol, description)
     VALUES %L
     RETURNING *;`,
        formattedData
      );
      return db.query(emojisData);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = seed;
