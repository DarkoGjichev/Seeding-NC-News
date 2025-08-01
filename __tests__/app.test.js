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

describe("*", () => {
  test("ALL METHODS: Responds with a 404 not found message when a request is made to an endpoint that does't exist on the api", () => {
    return request(app)
      .get("/not-an-endpoint")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Path Not Found");
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
            "comment_count",
          ]);
        });
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
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: Returns an object with the key of article and the value of an article object.", () => {
    const article_id = 1;
    return request(app)
      .get(`/api/articles/${article_id}`)
      .then(({ body: { article } }) => {
        expect(typeof article.article_id).toBe("number");
        expect(typeof article.title).toBe("string");
        expect(typeof article.topic).toBe("string");
        expect(typeof article.author).toBe("string");
        expect(typeof article.body).toBe("string");
        expect(typeof article.created_at).toBe("string");
        expect(typeof article.votes).toBe("number");
        expect(typeof article.article_img_url).toBe("string");
      });
  });
  test("404: Article does not exist", () => {
    const article_id = 2000;
    return request(app)
      .get(`/api/articles/${article_id}`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article Not Found");
      });
  });
  test("400: Wrong input data for article_id", () => {
    const article_id = "not-an-id";
    return request(app)
      .get(`/api/articles/${article_id}`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200: Returns an array with objects with the key of article and the value of an article object", () => {
    const article_id = 1;
    return request(app)
      .get(`/api/articles/${article_id}/comments`)
      .then(({ body: { comments } }) => {
        expect(comments).toHaveLength(11);
        comments.forEach((comment) => {
          expect(Object.keys(comment)).toEqual([
            "comment_id",
            "article_id",
            "body",
            "votes",
            "author",
            "created_at",
          ]);
        });
      });
  });
  test("200: Returns an empty array when a request is made for article_id that exists but has no associated comments", () => {
    const article_id = 7;
    return request(app)
      .get(`/api/articles/${article_id}/comments`)
      .then(({ body: { comments } }) => {
        expect(comments).toEqual([]);
      });
  });
  test("404: Article_id does not exist", () => {
    const article_id = 2000;
    return request(app)
      .get(`/api/articles/${article_id}/comments`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article Not Found");
      });
  });
  test("400: Wrong input data for article_id", () => {
    const article_id = "not-an-id";
    return request(app)
      .get(`/api/articles/${article_id}/comments`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("201: Returns the posted comment", () => {
    const article_id = 1;
    const newComment = {
      username: "butter_bridge",
      body: "Small text goes here...",
    };
    return request(app)
      .post(`/api/articles/${article_id}/comments`)
      .send(newComment)
      .expect(201)
      .then(({ body: { postedComment } }) => {
        expect(Object.keys(postedComment)).toEqual([
          "comment_id",
          "article_id",
          "body",
          "votes",
          "author",
          "created_at",
        ]);
        expect(postedComment.comment_id).toBe(19);
        expect(postedComment.article_id).toBe(1);
        expect(postedComment.body).toBe("Small text goes here...");
        expect(postedComment.votes).toBe(0);
        expect(postedComment.author).toBe("butter_bridge");
      });
  });
  test("400: Comment body does not contain correct fields", () => {
    const article_id = 1;
    const newComment = {};
    return request(app)
      .post(`/api/articles/${article_id}/comments`)
      .send(newComment)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request");
      });
  });
  test("400: Comment body contains correct fields but value of field is invalid", () => {
    const article_id = 1;
    const newComment = {
      username: 1,
      body: true,
    };
    return request(app)
      .post(`/api/articles/${article_id}/comments`)
      .send(newComment)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request");
      });
  });
  test("404: Article_id does not exist", () => {
    const article_id = 2000;
    const newComment = {
      username: "butter_bridge",
      body: "Small text goes here...",
    };
    return request(app)
      .post(`/api/articles/${article_id}/comments`)
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article Not Found");
      });
  });
  test("404: Wrong input type for article_id", () => {
    const article_id = "not-an-id";
    const newComment = {
      username: "butter_bridge",
      body: "Small text goes here...",
    };
    return request(app)
      .post(`/api/articles/${article_id}/comments`)
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("202: Updates votes on an article by article_id", () => {
    const article_id = 1;
    const newVotes = { inc_votes: 10 };
    return request(app)
      .patch(`/api/articles/${article_id}`)
      .send(newVotes)
      .expect(202)
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
        expect(article.votes).toBe(110);
      });
  });
  test("404: Article_id does not exist", () => {
    const article_id = 1000;
    const newVotes = { inc_votes: 10 };
    return request(app)
      .patch(`/api/articles/${article_id}`)
      .send(newVotes)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article Not Found");
      });
  });
  test("400: Wrong input type for article_id", () => {
    const article_id = "not-an-id";
    const newVotes = { inc_votes: 10 };
    return request(app)
      .patch(`/api/articles/${article_id}`)
      .send(newVotes)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("400: Wrong request with a body that does not contain the correct fields", () => {
    const article_id = 1;
    const newVotes = {};
    return request(app)
      .patch(`/api/articles/${article_id}`)
      .send(newVotes)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("400: Value of a field for votes is invalid", () => {
    const article_id = 1;
    const newVotes = { inc_votes: "word" };
    return request(app)
      .patch(`/api/articles/${article_id}`)
      .send(newVotes)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("204: Deletes a comment", () => {
    const comment_id = 1;
    return request(app).delete(`/api/comments/${comment_id}`).expect(201);
  });
  test("404: Comment does not exists", () => {
    const comment_id = 1000;
    return request(app)
      .delete(`/api/comments/${comment_id}`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Comment not found");
      });
  });
  test("400: Referencing an invalid ID", () => {
    const comment_id = "not-an-id";
    return request(app)
      .delete(`/api/comments/${comment_id}`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});

describe("GET /api/articles?sort_by=", () => {
  test("200: Returns an array with objects/articles sorted by title", () => {
    const sortBy = "title";
    return request(app)
      .get(`/api/articles?sort_by=${sortBy}`)
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toHaveLength(13);
        expect(articles[0].title).toBe("Z");
        articles.forEach((article) => {
          expect(Object.keys(article)).toEqual([
            "article_id",
            "title",
            "topic",
            "author",
            "created_at",
            "votes",
            "article_img_url",
            "comment_count",
          ]);
        });
      });
  });
  test("200: Returns an array with objects/articles sorted by title in ascending order", () => {
    const sortBy = "title";
    const orderBy = "ASC";
    return request(app)
      .get(`/api/articles?sort_by=${sortBy}&order_by=${orderBy}`)
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toHaveLength(13);
        expect(articles[0].title).toBe("A");
        articles.forEach((article) => {
          expect(Object.keys(article)).toEqual([
            "article_id",
            "title",
            "topic",
            "author",
            "created_at",
            "votes",
            "article_img_url",
            "comment_count",
          ]);
        });
      });
  });
  test("404: Collumn for sorting does not exists", () => {
    const sortBy = "not-a-collumn";
    return request(app)
      .get(`/api/articles?sort_by=${sortBy}`)
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Invalid Input");
      });
  });
  test("404: Not valid way of ordering table", () => {
    const sortBy = "title";
    const orderBy = "SRC";
    return request(app)
      .get(`/api/articles?sort_by=${sortBy}&order_by=${orderBy}`)
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Invalid Input");
      });
  });
});

describe("GET /api/articles?topic=", () => {
  test("200: Return an array with objects/articles filtered by a topic", () => {
    const topic = "mitch";
    return request(app)
      .get(`/api/articles?filter=${topic}`)
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toHaveLength(12);
        articles.forEach((article) => {
          expect(article.topic).toBe("mitch");
        });
      });
  });
  test("200: Return an empty array when passed a topic that does not references any articles", () => {
    const topic = "paper";
    return request(app)
      .get(`/api/articles?filter=${topic}`)
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toHaveLength(0);
      });
  });
  test("404: Topic does not exists", () => {
    const topic = "not-a-topic";
    return request(app)
      .get(`/api/articles?filter=${topic}`)
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Not Found");
      });
  });
});

describe("GET api/articles/:article_id(comment_count)", () => {
  test("200: Returns an article with count of all the comments associated with it", () => {
    const article_id = 1;
    return request(app)
      .get(`/api/articles/${article_id}`)
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article.comment_count).toBe(11);
      });
  });
  test("200: Returns an article with no comments associated with it", () => {
    const article_id = 13;
    return request(app)
      .get(`/api/articles/${article_id}`)
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article.comment_count).toBe(0);
      });
  });
  test("404: Article does not exist", () => {
    const article_id = 2000;
    return request(app)
      .get(`/api/articles/${article_id}`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article Not Found");
      });
  });
  test("400: Wrong input data for article_id", () => {
    const article_id = "not-an-id";
    return request(app)
      .get(`/api/articles/${article_id}`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});
