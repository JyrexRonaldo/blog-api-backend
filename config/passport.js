const bcrypt = require("bcryptjs");
const prisma = require("./prisma");
const passport = require("passport");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_KEY;
passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    const user = await prisma.user.findUnique({
      where: {
        id: jwt_payload.id,
      },
    });
      const match = jwt_payload.id === user.id ? true : false

    if (match) {
      return done(null, user);
    }
    return done(null, false);
  })
);

module.exports = passport;
