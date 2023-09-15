const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const User = require("../models/User");
const { JWT_SECRET } = require("./config");

// INITIAL LOIN VIA USERNAME AND PASSWORD:
passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: "Incorrect username or password",
        });
      }
      if (!user.verifyPassword(password)) {
        return done(null, false, {
          message: "Incorrect username or password",
        });
      }
      return done(null, user);
    });
  })
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
        const user = await User.findById(payload.sub);

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
