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
      console.log(ctx.request.body);
      ctx.body = await sps.create(ctx.request.body);
    })
    .put('/:id', async (ctx, next) => {
      //update superpower

      ctx.body = 'rooms API!';
    })
    .del('/:id', async (ctx, next) => {
      //delete superpower

      ctx.body = 'rooms API!';
    });
};