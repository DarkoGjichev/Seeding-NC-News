const endpointsJson = require("../endpoints.json");
/* Set up your test imports here */
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data");
const request = require("supertest");
/* Set up your beforeEach & afterAll functions here */
beforeEach(() => seed(data));
afterAll(() => db.end());

describe.skip("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("200: Returns an object with the key of topics and the value of an array of topic objects.", () => {
    return request(app)
      .get("/api/topics")
      .then(({ body: { topics } }) => {
        expect(topics).toHaveLength(3);
        topics.forEach((topic) => {
          expect(Object.keys(topic)).toEqual([
            "slug",
            "description",
            "img_url",
          ]);
        });
      })
      .catch((err) => {
        if (err) throw err;
      });
  });
});

describe("GET /api/articles", () => {
  test("200: Returns an object with the key of articles and the value of an array of article objects", () => {
    return request(app)
      .get("/api/articles")
      .then(({ body: { articles } }) => {
        expect(articles).toHaveLength(13);
        articles.forEach((article) => {
          expect(Object.keys(article)).toEqual([
            "article_id",
            "title",
            "topic",
            "author",
            "created_at",
            "votes",
            "article_img_url",
          ]);
        });
      })
      .catch((err) => {
        if (err) throw err;
      });
  });
});

describe("GET /api/users", () => {
  test("200: Returns an object with the key of users and the value of an array of objects.", () => {
    return request(app)
      .get("/api/users")
      .then(({ body: { users } }) => {
        expect(users).toHaveLength(4);
        users.forEach((article) => {
          expect(Object.keys(article)).toEqual([
            "username",
            "name",
            "avatar_url",
          ]);
        });
      })
      .catch((err) => {
        if (err) throw err;
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: Returns an object with the key of article and the value of an article object.", () => {
    const article_id = 1;
    return request(app)
      .get(`/api/articles/${article_id}`)
      .then(({ body: { article } }) => {
        expect(Object.keys(article)).toEqual([
          "article_id",
          "title",
          "topic",
          "author",
          "body",
          "created_at",
          "votes",
          "article_img_url",
        ]);
        expect(typeof article.article_id).toBe("number");
        expect(typeof article.title).toBe("string");
        expect(typeof article.topic).toBe("string");
        expect(typeof article.author).toBe("string");
        expect(typeof article.body).toBe("string");
        expect(typeof article.created_at).toBe("string");
        expect(typeof article.votes).toBe("number");
        expect(typeof article.article_img_url).toBe("string");
      })
      .catch((err) => {
        if (err) throw err;
      });
  });
  test("404: Article does not exist", () => {
    const article_id = 2000;
    return request(app)
      .get(`/api/articles/${article_id}`)
      .then((res) => {
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Article not found");
      })
      .catch((err) => {
        if (err) throw err;
      });
  });
});
