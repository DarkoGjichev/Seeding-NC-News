const tableQueries = `DROP TABLE IF EXISTS comments;

    DROP TABLE IF EXISTS articles;

    DROP TABLE IF EXISTS topics;

    DROP TABLE IF EXISTS users;

    CREATE TABLE topics (
        slug VARCHAR PRIMARY KEY,
        description VARCHAR,
        img_url VARCHAR(1000)
        );

    CREATE TABLE users (
        username VARCHAR PRIMARY KEY,
        name VARCHAR,
        avatar_url VARCHAR(1000)
        );

    CREATE TABLE articles (
        article_id SERIAL PRIMARY KEY,
        title VARCHAR,
        topic VARCHAR REFERENCES topics(slug),
        author VARCHAR REFERENCES users(username),
        body TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        votes INT DEFAULT 0,
        article_img_url VARCHAR(1000)
        );
        
    CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        article_id INT REFERENCES articles(article_id),
        body TEXT,
        votes INT DEFAULT 0,
        author VARCHAR REFERENCES users(username),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;

module.exports = tableQueries;
