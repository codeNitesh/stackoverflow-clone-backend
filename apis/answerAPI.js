const Answer = require("../models/Answer");
const Question = require("../models/Question");

async function createAnswer(req, res) {
  try {
    const { body, questionId } = req.body;
    const author = req.user._id;
    console.log(req.user);
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
    const userId = req.user._id;
    const answer = await Answer.findById(req.params.id);

    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    // Check if the user is the author of the answer
    if (answer.author.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }
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
    const userId = req.user._id;
    const answer = await Answer.findById(req.params.id);

    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    // Check if the user is the author of the answer
    if (answer.author.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

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

async function markAnswerAsAccepted(req, res) {
  try {
    const answerId = req.params.id;
    const userId = req.user._id;
    const answer = await Answer.findById(answerId);

    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    // Find the associated question
    const question = await Question.findById(answer.question);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Check if the user is the author of the question
    if (question.author.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Mark the answer as accepted
    answer.accepted = true;
    await answer.save();

    // Unmark any previously accepted answers for this question
    await Answer.updateMany(
      { question: question._id, _id: { $ne: answer._id } },
      { $set: { accepted: false } }
    );

    
    res.json(answer);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        error: "An error occurred while marking the answer as accepted",
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
