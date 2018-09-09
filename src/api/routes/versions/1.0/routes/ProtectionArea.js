const router = new (require('koa-router'))();
const convert = require('koa-convert')
const jwt = require('koa-jwt');
const ProtectionAreaService = require("../services/ProtectionArea");

module.exports = app => {

  const sph = ProtectionAreaService(app);
  
  return router
    .get('/', async (ctx, next) => {
      //get all ProtectionAreas paginated
      const user = ctx.req.user;

      let page = ctx.query.page || 1;      // page number
      let limit =  ctx.query.limit || 50;
      ctx.body = await sph.getAll(limit, page);
    })
    .get('/:id', async (ctx, next) => {
      //get single ProtectionArea      
      ctx.body = ctx.req;
    })
    .post('/', async (ctx, next) => {
      //create ProtectionArea
      ctx.body = await sph.create(ctx.request.body, ctx.req.user);
    })
    .put('/:id', async (ctx, next) => {
      //update ProtectionArea

      const ProtectionArea = ctx.request.body;
      ProtectionArea.id = ctx.params.id;
      ctx.body = await sph.update(ProtectionArea, ctx.req.user);
    })
    .del('/:id', async (ctx, next) => {
      //delete ProtectionArea

      ctx.body = await sph.drop(ctx.params.id, ctx.req.user);
    });
};