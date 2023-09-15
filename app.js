const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const authRoutes = require('./routes/auth');

const app = express();


// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/auth', authRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});