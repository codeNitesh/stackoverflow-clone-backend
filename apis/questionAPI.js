const Question = require("../models/Question");
const Answer = require("../models/Answer");

// Create a new question
async function createQuestion(req, res) {
  try {
    const { title, body, tags } = req.body;
    const author = req.user._id;
    const question = new Question({ title, body, tags, author });
    await question.save();
    res.json(question);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the question" });
  }
}

// Get all questions
async function getAllQuestions(req, res) {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching questions" });
  }
}

// Get a single question by ID
async function getQuestionById(req, res) {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json(question);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the question" });
  }
}


// Update a question by ID
async function updateQuestionById(req, res) {
  try {
    const { title, body, tags } = req.body;

    const userId = req.user._id;
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Check if the user is the author of the question
    if (question.author.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      { title, body, tags },
      { new: true }
    );
    if (!updatedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json(updatedQuestion);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the question" });
  }
}

// Delete a question by ID
async function deleteQuestionById(req, res) {
  try {
    const deletedQuestion = await Question.findByIdAndRemove(req.params.id);
    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Also delete associated answers
    await Answer.deleteMany({ question: req.params.id });

    res.json({ message: "Question deleted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the question" });
  }
}

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestionById,
  deleteQuestionById,
};
