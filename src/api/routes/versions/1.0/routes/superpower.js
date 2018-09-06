const router = new (require('koa-router'))();
const convert = require('koa-convert')
const jwt = require('koa-jwt');
const SuperPowerService = require("../services/superpower");

module.exports = app => {
  console.log(SuperPowerService)
  const sps = SuperPowerService(app);
  console.log(sps)
  
  return router
    .get('/', async (ctx, next) => {
      //get all superpowers paginated
      const user = ctx.req.user;
      const queryParams = ctx.query;
      ctx.body = await sps.getAll(1, 1, 1);
    })
    .get('/:id', (ctx, next) => {
      //get single superpower      
      ctx.body = ctx.req;
    })
    .post('/', (ctx, next) => {
      //create superpower
      console.log(sps.getAll);
      ctx.body = ctx.request.body;//await sps.create(ctx.req);
    })
    .put('/:id', (ctx, next) => {
      //update superpower

      ctx.body = 'rooms API!';
    })
    .del('/:id', (ctx, next) => {
      //delete superpower

      ctx.body = 'rooms API!';
    });
};