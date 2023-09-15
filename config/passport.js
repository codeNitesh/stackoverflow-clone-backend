const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/User");
const { JWT_SECRET } = require("./config");

// INITIAL LOGIN VIA USERNAME AND PASSWORD:
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });

        if (!user) {
          return done(null, false, {
            message: "Incorrect username or password",
          });
        }

        // to check for password
        user.comparePassword(password, (err, isMatch) => {
          if (err) return done(err);
          if (!isMatch) {
            return done(null, false, {
              message: "Incorrect username or password",
            });
          }
          return done(null, user);
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);

// JWT -> for token-based authentication, for subsequent API requests
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload._id);

        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);
