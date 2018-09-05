const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user'); 

const options = {};

passport.serializeUser((user, done) => { done(null, user.id); });

passport.deserializeUser((id, done) => {
  console.log('UserUserUser', User)
  return User.findById(id)
  .then((user) => { done(null, user); })
  .catch((err) => { done(err,null); });
});

passport.use(new LocalStrategy(options, (username, password, done) => {
  console.log('UserUserUser', User)
  User.findOne({ where: { username } })
  .then((user) => {
    if (!user) return done(null, false);
    if (password === user.password) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
  .catch((err) => { return done(err); });
}));
