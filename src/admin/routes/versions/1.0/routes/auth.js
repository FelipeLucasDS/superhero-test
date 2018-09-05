const router = new (require('koa-router'))();
const passport = require('koa-passport');
const fs = require('fs');

const User = require('./../../../../models/user');

const ensureAuthenticated = (context)=> {
  return context.isAuthenticated();
}

const ensureAdmin = (context) => {
  return new Promise((resolve, reject) => {
    if (context.isAuthenticated()) {
      User.findOne(context.state.user.id)
      .then((user) => {
        if (user && user[0].admin) resolve(true);
        resolve(false);
      })
      .catch((err) => { reject(false); });
    }
    return false;
  });
}

router.post('/login', async (ctx) => {
    return passport.authenticate('local', (err, user, info, status) => {

      if (user) {
        ctx.login(user);
        ctx.body = { err, user, info, status };
      } else {
        ctx.status = 400;
        ctx.body = { err, user, info, status };
      }
    })(ctx);
});

router.get('/logout', async (ctx) => {
  if (ensureAuthenticated(ctx)) {
    ctx.logout();
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
});

module.exports = router;