const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const options = {};

module.exports = app => {

  const User = app.db.User;

  passport.serializeUser((user, done) => { 
    //TODO
    done(null, user.username); 
  });

  passport.deserializeUser((id, done) => {
    return User.findById(id)
    .then((user) => { done(null, user); })
    .catch((err) => { done(err, null); });
  });

  passport.use(new LocalStrategy(options, (username, password, done) => {
    User.findOne({ where: { username } })
    .then((user) => {
      if (!user) 
        return done(null, false);
      
      user = user.dataValues;

      if (password === user.password) {
          return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => { 
      return done(err); 
    });
  }));
}