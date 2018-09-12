const router = new(require('koa-router'))();
const convert = require('koa-convert')
const jwt = require('koa-jwt');
const SuperPowerService = require("../services/SuperPower");

module.exports = app => {

  const sps = SuperPowerService(app);


  router.get('/', async (ctx, next) => {
    //get all superpowers paginated
    const user = ctx.req.user;
    let page = ctx.query.page || 1; // page number
    let limit = ctx.query.limit || 50;

    ctx.body = await sps.getAll(limit, page);
    ctx.status = 200;
  })
  router.get('/:id', async (ctx, next) => {
    //get single superpower      
    ctx.body = await sps.getSingle(ctx.params.id);
    ctx.status = 200;
  })
  router.post('/', app.ensureAdmin, async (ctx, next) => {
    //create superpower
    ctx.body = await sps.create(ctx.request.body, ctx.req.user);
    ctx.status = 201;
  })
  router.put('/:id/superhero/:superHeroId', app.ensureAdmin, async (ctx, next) => {
    //create superpower

    const SuperHeroPowers = {
      superHeroId: ctx.params.superHeroId,
      superPowerId: ctx.params.id
    }
    ctx.body = await sps.bind(SuperHeroPowers, ctx.req.user);
    ctx.status = 200;
  })
  router.put('/:id', app.ensureAdmin, async (ctx, next) => {
    //update superpower

    const superPower = ctx.request.body;
    superPower.id = ctx.params.id;
    ctx.body = await sps.update(superPower, ctx.req.user);
    ctx.status = 200;
  })
  router.del('/:id', app.ensureAdmin, async (ctx, next) => {
    //delete superpower

    ctx.body = await sps.drop(ctx.params.id, ctx.req.user);
    ctx.status = 200;
  });
  return router;
};