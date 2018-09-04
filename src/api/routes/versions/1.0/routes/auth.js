const router = new (require('koa-router'))();

router
  .all('/', (ctx, next) => {
    ctx.body = 'rooms API!';
    throw new Error("AHHHH")
  });

module.exports = router;