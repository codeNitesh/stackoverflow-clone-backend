const Question = require("../models/Question");

// Search for questions by keywords
async function searchByTitleTag(req, res) {
  try {
    const { query } = req.query;
    const results = await Question.find({ $text: { $search: query } });
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while searching question." });
  }
}

module.exports = {
  searchByTitleTag,
};
