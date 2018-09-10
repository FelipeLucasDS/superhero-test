const router = new (require('koa-router'))();
const passport = require('koa-passport');
const fs = require('fs');

const bcrypt = require('../../../../../lib/helpers/bcrypt');
const User = require('./../../../../models/User');
router.post('/login', async (ctx) => {   
    return passport.authenticate('local', (err, user, info, status) => {
      if (user) {
        ctx.login(user);

        ctx.body = { token: bcrypt.generateJWT(user) }
      } else {
        ctx.status = 400;
        ctx.body = { err, user, info, status };
      }
    })(ctx);
});

router.get('/logout', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.logout();
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
});

module.exports = app => router;