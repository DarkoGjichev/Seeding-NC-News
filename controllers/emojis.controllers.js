const { fetchAllEmojis } = require("../models/emojis.models");

const getAllEmojis = (req, res) => {
  return fetchAllEmojis().then((emojis) => {
    res.status(200).send({ emojis });
  });
};

module.exports = { getAllEmojis };
