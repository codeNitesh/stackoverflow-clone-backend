const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  // PASSWORD TO BE STORED AS HASH
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// PRE - Hashing the password before saving it
userSchema.pre("save", function (next) {
  const currentUser = this;
  if (!currentUser.isModified("password")) return next();

  bcrypt.hash(currentUser.password, 10, (err, hash) => {
    if (err) return next(err);
    currentUser.password = hash;
    next();
  });
});

// Defining comparePassword method
userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
