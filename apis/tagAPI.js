const Tag = require("../models/Tag");

// Create a new tag
async function createTag(req, res) {
  try {
    const { name } = req.body;
    const tag = new Tag({ name });
    await tag.save();
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while creating the tag" });
  }
}

async function getAllTags(req, res) {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching tags" });
  }
}

// Get a single tag by ID
async function getTagById(req, res) {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching the tag" });
  }
}

async function updateTagById(req, res) {
  try {
    const { name } = req.body;
    const updatedTag = await Tag.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!updatedTag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    res.json(updatedTag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while updating the tag" });
  }
}

// Delete a tag by ID
async function deleteTagById(req, res) {
  try {
    const deletedTag = await Tag.findByIdAndRemove(req.params.id);
    if (!deletedTag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    res.json({ message: "Tag deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while deleting the tag" });
  }
}

module.exports = {
  createTag,
  getAllTags,
  getTagById,
  updateTagById,
  deleteTagById,
};
