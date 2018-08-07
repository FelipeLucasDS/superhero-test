const router = new (require('koa-router'))();

router
  .get('/', (ctx, next) => {
    ctx.body = 'rooms API!';
  })
  .post('/', (ctx, next) => {
    ctx.body = 'rooms API!';
  })
  .put('/:id', (ctx, next) => {
    ctx.body = 'rooms API!';
  })
  .del('/:id', (ctx, next) => {
    ctx.body = 'rooms API!';
  });

module.exports = router;