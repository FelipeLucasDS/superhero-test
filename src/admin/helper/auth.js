const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('../../lib/helpers/bcrypt');

const options = {};

module.exports = app => {

  const User = app.db.User;

  passport.serializeUser((user, done) => { 
    if(!user){
      done(null, false); 
    }
    done(null, user); 
  });

  passport.deserializeUser((user, done) => {
    return User.findById(user.id)
    .then((user) => { done(null, user); })
    .catch((err) => { done(err, null); });
  });

  passport.use(new LocalStrategy(options, (username, password, done) => {
    User.findOne({ where: { username } })
    .then((user) => {
      if (!user) 
        return done(null, false);
      
      user = user.dataValues;

      if (bcrypt.checkPassword(password, user.password)) {
        user.password = undefined;  
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