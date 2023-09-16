const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const { MONGODB_URI } = require("./config/config");
const authRoutes = require("./routes/authRoute");
const questionRoutes = require("./routes/questionRoute");
const answerRoutes = require("./routes/answerRoute");
const tagRoutes = require("./routes/tagRoute");
const searchRoutes = require("./routes/searchRoute");
const cors = require('cors');

const authenticate = require("./middleware/authenticate");
require("./config/passport");

const app = express();

// Connect to DB -> MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
// app.use(authenticate)

app.use("/auth", authRoutes);
app.use("/questions", questionRoutes);
app.use("/answers", answerRoutes);
app.use("/tags", tagRoutes);
app.use("/search", searchRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
