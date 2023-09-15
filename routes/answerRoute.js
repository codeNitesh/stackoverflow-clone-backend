const express = require("express");
const router = express.Router();
const passport = require("passport");
const AnswerAPI = require("../apis/answerAPI");

// Create a new answer of given question
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  AnswerAPI.createAnswer
);

// Get all answers of given question
router.get("/question/:questionId", AnswerAPI.getAnswersForQuestion);

// Get a single answer by ID
router.get("/:id", AnswerAPI.getAnswerById);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  AnswerAPI.updateAnswerById
);

// Delete an answer by ID
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  AnswerAPI.deleteAnswerById
);

// Mark an answer as accepted
router.put(
  "/:id/accept",
  passport.authenticate("jwt", { session: false }),
  AnswerAPI.markAnswerAsAccepted
);

module.exports = router;
