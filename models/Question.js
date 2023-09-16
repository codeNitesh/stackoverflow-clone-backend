const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  // ARRAY OF TAGS IN STRING FORMAT
  tags: [String],
  // REFERENCE TO THE USER
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // ARRAY OF ANSWERS WITH OBJECT ID
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Search functionality -> index on title and tags
questionSchema.index({ title: "text", tags: "text" });

module.exports = mongoose.model("Question", questionSchema);
