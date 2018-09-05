const router = new (require('koa-router'))();
const convert = require('koa-convert')
var jwt = require('koa-jwt');

router
  .all('/', (ctx, next) => {
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