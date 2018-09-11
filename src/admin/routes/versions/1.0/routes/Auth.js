const router = new(require('koa-router'))();
const passport = require('koa-passport');
const fs = require('fs');

const bcrypt = require('../../../../../lib/helpers/bcrypt');
const User = require('./../../../../models/User');


module.exports = app => {
  router.post('/login', async (ctx) => {
    return passport.authenticate('local', async (err, user, info, status) => {
      if (user) {
        await ctx.login(user);


        ctx.body = {
          token: bcrypt.generateJWT(user)
        }

      } else {
        ctx.status = 401;
        ctx.body = {
          err,
          user,
          info,
          status
        };
      }
    })(ctx);
  });

  return router;
};