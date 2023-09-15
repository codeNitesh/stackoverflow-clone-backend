const express = require("express");
const passport = require("passport");
const { registerUser, generateToken } = require("../apis/authAPI");

const authRoute = express.Router();

// New User registration route
authRoute.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await registerUser(username, password);
    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// User login route, returns token
authRoute.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json(info);

    const apiToken = generateToken(user);
    res.json({ apiToken });
  })(req, res, next);
});

module.exports = authRoute;
