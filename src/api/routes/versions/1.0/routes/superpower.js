const router = new (require('koa-router'))();
const convert = require('koa-convert')
const jwt = require('koa-jwt');
const SuperPowerService = require("../services/superpower");

module.exports = app => {
  const sps = SuperPowerService(app);
  
  return router
    .get('/', async (ctx, next) => {
      //get all superpowers paginated
      const user = ctx.req.user;
      const queryParams = ctx.query;
      ctx.body = await sps.getAll(1, 1, 1);
    })
    .get('/:id', async (ctx, next) => {
      //get single superpower      
      ctx.body = ctx.req;
    })
    .post('/', async (ctx, next) => {
      //create superpower
      ctx.body = await sps.create(ctx.request.body, ctx.req.user);
    })
    .put('/:id', async (ctx, next) => {
      //update superpower

      const superPower = ctx.request.body;
      superPower.id = ctx.params.id;
      ctx.body = await sps.update(superPower, ctx.req.user);
    })
    .del('/:id', async (ctx, next) => {
      //delete superpower

      ctx.body = await sps.drop(ctx.params.id, ctx.req.user);
    });
};