# NC News API

## Overview

NC News API is a backend service for a news site, similar to Reddit or Hacker News. It allows developers to access articles, topics, comments, and users programmatically through a RESTful API.

The API is fully hosted and can be explored online: [NC News API Hosted Version](https://seeding-nc-news-3h3w.onrender.com/api/)

---

## Summary

This project demonstrates building a RESTful backend using Node.js, Express, and PostgreSQL. It includes seeding databases, creating endpoints for GET, POST, PATCH and DELETE operations, and handling queries and comments. The API is structured to be clear and beginner-friendly while demonstrating best practices for backend development.

---

## Minimum Requirements

- Node.js v24.1.0 or above
- PostgreSQL v8.16.3 or above

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/DarkoGjichev/Seeding-NC-News.git
code Seeding-NC-News
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create two `.env` files in the project root:

- `.env.development`

```
PGDATABASE=nc_news
```

- `.env.test`

```
PGDATABASE=nc_news_test
```

> Ensure both files are in `.gitignore` so credentials are not pushed to GitHub.

### Create and Seed Databases

```bash
npm run setup-dbs
npm run seed-dev
```

For test database verification:

```bash
npm run test-seed
```

### Running the Project

```bash
npm run dev
```

### Running Tests

```bash
npm test
```

---

## Database Schema

### `topics`

| Column      | Type | Constraints                   | Description             |
| ----------- | ---- | ----------------------------- | ----------------------- |
| slug        | TEXT | PRIMARY KEY, UNIQUE, NOT NULL | Unique topic identifier |
| description | TEXT | NOT NULL                      | Short description       |
| img_url     | TEXT |                               | Image link              |

### `users`

| Column     | Type | Constraints                   | Description        |
| ---------- | ---- | ----------------------------- | ------------------ |
| username   | TEXT | PRIMARY KEY, UNIQUE, NOT NULL | User handle        |
| name       | TEXT | NOT NULL                      | Full name          |
| avatar_url | TEXT |                               | Profile image link |

### `articles`

| Column          | Type      | Constraints                            | Description     |
| --------------- | --------- | -------------------------------------- | --------------- |
| article_id      | SERIAL    | PRIMARY KEY                            | Unique ID       |
| title           | TEXT      | NOT NULL                               | Article title   |
| topic           | TEXT      | REFERENCES `topics(slug)`, NOT NULL    | Topic           |
| author          | TEXT      | REFERENCES `users(username)`, NOT NULL | Author          |
| body            | TEXT      | NOT NULL                               | Article content |
| created_at      | TIMESTAMP | DEFAULT CURRENT TIMESTAMP              | Created date    |
| votes           | INT       | DEFAULT 0                              | Vote count      |
| article_img_url | TEXT      |                                        | Article image   |

### `comments`

| Column     | Type      | Constraints                                 | Description     |
| ---------- | --------- | ------------------------------------------- | --------------- |
| comment_id | SERIAL    | PRIMARY KEY                                 | Unique ID       |
| article_id | INT       | REFERENCES `articles(article_id)`, NOT NULL | Related article |
| body       | TEXT      | NOT NULL                                    | Comment content |
| votes      | INT       | DEFAULT 0                                   | Vote count      |
| author     | TEXT      | REFERENCES `users(username)`, NOT NULL      | Comment author  |
| created_at | TIMESTAMP | DEFAULT now()                               | Created date    |

---

## API Reference

The API supports GPOST, PATCH & DELETE operations for articles, comments, topics, and users. Example endpoints:

- `GET /api/topics`
- `GET /api/users`
- `GET /api/articles`
- `GET /api/articles/:article_id`
- `GET /api/articles/:article_id/comments`
- `POST /api/articles/:article_id/comments`
- `PATCH /api/articles/:article_id`
- `DELETE /api/comments/:comment_id`

For full endpoint examples and JSON responses, see the hosted API: [NC News API](https://seeding-nc-news-3h3w.onrender.com/api/)

---

## Contributing

- Commit often with clear, imperative messages.
- Ensure all tests pass before committing.
- Husky prevents committing broken code.

---

## Hosting

The API is hosted at: [https://seeding-nc-news-3h3w.onrender.com/api/](https://seeding-nc-news-3h3w.onrender.com/api/)
