const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const config = require('../config/app.config');
const User = require('../models/user.model');

// Passport JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.Security.JWT.Secret
};

const jwtStrategy = new Strategy(jwtOptions, async (jwtPayload, done) => {
    try {
        const user = await User.findById(jwtPayload.id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
});

passport.use(jwtStrategy);

module.exports = passport;
