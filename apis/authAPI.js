const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_SECRET } = require("../config/config");

async function registerUser(username, password) {
  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      throw new Error("Username already exists");
    }

    const newUser = new User({ username, password });
    await newUser.save();
    return { message: "User registered successfully" };
  } catch (err) {
    throw err;
  }
}

// Generate JWT token
function generateToken(user) {
  const payload = {
    _id: user._id,
    username: user.username,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" }); // Token expires in 24 hour
}

module.exports = {
  registerUser,
  generateToken,
};
