const express = require("express");
const router = express.Router();
const TagAPI = require("../api/tags");

// Create a new tag
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  TagAPI.createTag
);

// Get all tags
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  TagAPI.getAllTags
);

// Get a single tag by ID
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  TagAPI.getTagById
);

// Update a tag by ID
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  TagAPI.updateTagById
);

// Delete a tag by ID
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  TagAPI.deleteTagById
);

module.exports = router;
