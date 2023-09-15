const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  // REFERENCE TO THE USER
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // REFERENCE TO THE QUESTION
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
  // ANSWER ACEEPTED AS TRUE OR FALSE
  accepted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Answer", answerSchema);
