const router = new (require('koa-router'))();
const convert = require('koa-convert')
const jwt = require('koa-jwt');
const UserService = require("../services/User");

module.exports = app => {

  const sps = UserService(app);
  
  return router
    .get('/', async (ctx, next) => {
      //get all Users paginated
      const user = ctx.req.user;

      let page = ctx.query.page || 1;      // page number
      let limit =  ctx.query.limit || 50;

      ctx.body = await sps.getAll(limit, page);
    })
    .get('/:id', async (ctx, next) => {
      //get single User      
      ctx.body =  await sps.getSingle(ctx.params.id);
    })
    .post('/', async (ctx, next) => {
      //create User
      ctx.body = await sps.create(ctx.request.body, ctx.req.user);
    })
    .put('/:id', async (ctx, next) => {
      //update User

      const User = ctx.request.body;
      User.id = ctx.params.id;
      ctx.body = await sps.update(User, ctx.req.user);
    })
    .del('/:id', async (ctx, next) => {
      //delete User

      ctx.body = await sps.drop(ctx.params.id, ctx.req.user);
    });
};