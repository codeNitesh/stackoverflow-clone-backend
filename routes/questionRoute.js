const express = require("express");
const router = express.Router();
const passport = require("passport");
const QuestionAPI = require("../apis/questionAPI");

// Create a new question
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  QuestionAPI.createQuestion
);

// Get all questions
router.get("/", QuestionAPI.getAllQuestions);

// Get a single question by ID
router.get("/:id", QuestionAPI.getQuestionById);

// Update a question by ID
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  QuestionAPI.updateQuestionById
);

// Delete a question by ID
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  QuestionAPI.deleteQuestionById
);

module.exports = router;
