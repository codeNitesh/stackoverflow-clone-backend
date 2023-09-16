const express = require("express");
const router = express.Router();
const passport = require("passport");
const searchAPI = require("../apis/searchAPI");

// Search for questions by keywords

router.get("/", searchAPI.searchByTitleTag);

module.exports = router;
