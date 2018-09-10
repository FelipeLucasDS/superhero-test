const router = new (require('koa-router'))();
const convert = require('koa-convert')
const jwt = require('koa-jwt');
const SuperHeroService = require("../services/SuperHero");

module.exports = app => {

  const sph = SuperHeroService(app);
  
  return router
    .get('/', async (ctx, next) => {
      //get all SuperHeros paginated
      const user = ctx.req.user;

      let page = ctx.query.page || 1;      // page number
      let limit =  ctx.query.limit || 50;
      ctx.body = await sph.getAll(limit, page);
    })
    .get('/:id', async (ctx, next) => {
      //get single SuperHero      
      ctx.body = ctx.req;
    })
    .post('/', app.ensureAdmin, async (ctx, next) => {
      //create SuperHero
      ctx.body = await sph.create(ctx.request.body, ctx.req.user);
    })
    .put('/:id', app.ensureAdmin, async (ctx, next) => {
      //update SuperHero

      const SuperHero = ctx.request.body;
      SuperHero.id = ctx.params.id;
      ctx.body = await sph.update(SuperHero, ctx.req.user);
    })
    .del('/:id', app.ensureAdmin, async (ctx, next) => {
      //delete SuperHero

      ctx.body = await sph.drop(ctx.params.id, ctx.req.user);
    });
};