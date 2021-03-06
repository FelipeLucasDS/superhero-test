const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('../../lib/helpers/bcrypt');

const options = {};

module.exports = app => {

  const User = app.db.User;
  const Role = app.db.Role;

  passport.serializeUser((user, done) => { 
    if(!user){
      done(null, false); 
    }
    done(null, user); 
  });

  passport.deserializeUser((user, done) => {
    return User.findById(user.id)
      .then((user) => { 
          done(null, user); 
      })
      .catch((err) => { done(err, null); });
  });

  passport.use(new LocalStrategy(options, (username, password, done) => {
    User.findOne({ where: { username } })
    .then(async (user) => {
        if (!user) 
          return done(null, false);
        
        user = user.dataValues;
        const [passOK, role] = await Promise.all([
            bcrypt.checkPassword(password, user.password),
            Role.findById(user.role)
        ]);
        user.role = role.dataValues
        if (passOK) {
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