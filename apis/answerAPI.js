const Answer = require("../models/Answer");
const Question = require("../models/Question");

async function createAnswer(req, res) {
  try {
    const { body, questionId } = req.body;
    const author = req.user._id;
    const answer = new Answer({ body, author, question: questionId });
    await answer.save();

    await Question.findByIdAndUpdate(questionId, {
      $push: { answers: answer._id },
    });

    res.json(answer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while creating the answer" });
  }
}

// Get all answers for a question
async function getAnswersForQuestion(req, res) {
  try {
    const answers = await Answer.find({ question: req.params.questionId });
    res.json(answers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while fetching answers" });
  }
}

// Get a single answer by ID
async function getAnswerById(req, res) {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }
    res.json(answer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while fetching the answer" });
  }
}

// Update an answer by ID
async function updateAnswerById(req, res) {
  try {
    const { body } = req.body;
    const updatedAnswer = await Answer.findByIdAndUpdate(
      req.params.id,
      { body },
      { new: true }
    );
    if (!updatedAnswer) {
      return res.status(404).json({ error: "Answer not found" });
    }
    res.json(updatedAnswer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while updating the answer" });
  }
}

// Delete an answer by ID
async function deleteAnswerById(req, res) {
  try {
    const deletedAnswer = await Answer.findByIdAndRemove(req.params.id);
    if (!deletedAnswer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    // Remove the answer ID from the associated question
    await Question.findByIdAndUpdate(deletedAnswer.question, {
      $pull: { answers: deletedAnswer._id },
    });

    res.json({ message: "Answer deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while deleting the answer" });
  }
}

// Mark an answer as accepted
async function markAnswerAsAccepted(req, res) {
  try {
    const { id } = req.params;
    const answer = await Answer.findByIdAndUpdate(
      id,
      { accepted: true },
      { new: true }
    );
    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    // Unmark other answers for the same question as accepted
    await Answer.updateMany(
      { question: answer.question, _id: { $ne: answer._id } },
      { accepted: false }
    );

    res.json(answer);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error while marking the answer as accepted",
    });
  }
}

module.exports = {
  createAnswer,
  getAnswersForQuestion,
  getAnswerById,
  updateAnswerById,
  deleteAnswerById,
  markAnswerAsAccepted,
};
