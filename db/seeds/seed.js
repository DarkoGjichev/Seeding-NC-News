const db = require("../connection");
var format = require("pg-format");
const { convertTimestampToDate, createLookupRef } = require("./utils.js");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users`);
    })
    .then(() => {
      return db.query(`CREATE TABLE topics (
      slug VARCHAR PRIMARY KEY,
      description VARCHAR,
      img_url VARCHAR(1000)
      );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE users (
      username VARCHAR PRIMARY KEY,
      name VARCHAR,
      avatar_url VARCHAR(1000)
      );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR,
      topic VARCHAR REFERENCES topics(slug),
      author VARCHAR REFERENCES users(username),
      body TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      votes INT DEFAULT 0,
      article_img_url VARCHAR(1000)
      );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      article_id INT REFERENCES articles(article_id),
      body TEXT,
      votes INT DEFAULT 0,
      author VARCHAR REFERENCES users(username),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
    })
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
        const convertedTimestamp = convertTimestampToDate(article);
        return [
          article.title,
          article.topic,
          article.author,
          article.body,
          convertedTimestamp.created_at,
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
        const convertedTimestamp = convertTimestampToDate(comment);
        return [
          ref[comment.article_title],
          comment.body,
          comment.votes,
          comment.author,
          convertedTimestamp.created_at,
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
    .catch((err) => {
      console.error(err);
    });
};

module.exports = seed;
