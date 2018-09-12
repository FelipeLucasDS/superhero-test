const router = new(require('koa-router'))();
const convert = require('koa-convert')
const jwt = require('koa-jwt');
const SuperHeroService = require("../services/SuperHero");

module.exports = app => {

  const sph = SuperHeroService(app);
  /**
   * Gets all super heroes paginated.
   * @param {Number} ctx.query.page Page of pagination.
   * @param {Number} ctx.query.limit Items per page.
   * @return {{page: {page: Number, pages: Number},
   *          {data: [{
   *               id: Number, 
   *               name: String, 
   *               alias: String, 
   *               SuperPowers: [{
   *                  id: Number,
   *                  name: String,
   *                  description: String,
   *                  SuperHeroesPowers: {
   *                     superHeroId: Number,
   *                     superPowerId: Number
   *                  }
   *               }],
   *                ProtectionArea: {
   *                   id: Number,
   *                   name: String,
   *                   lat: String,
   *                   long: String,
   *                   radius: Number
   *               }
   *         }]
   *     }}
   */
  router
    .get('/', async (ctx, next) => {
      //get all SuperHeros paginated
      const user = ctx.req.user;

      let page = ctx.query.page || 1; // page number
      let limit = ctx.query.limit || 50;
      ctx.body = await sph.getAll(limit, page);
      ctx.status = 200;
    })

    /**
   * Get super heroes by id.
   * @param {Number} ctx.params.id Id of the super heroes.
   * @return {{id: Number, 
   *               name: String, 
   *               alias: String, 
   *               SuperPowers: [{
   *                  id: Number,
   *                  name: String,
   *                  description: String,
   *                  SuperHeroesPowers: {
   *                     superHeroId: Number,
   *                     superPowerId: Number
   *                  }
   *               }],
   *                ProtectionArea: {
   *                   id: Number,
   *                   name: String,
   *                   lat: String,
   *                   long: String,
   *                   radius: Number
   *               }
   *         }
   */
  router.get('/:id', async (ctx, next) => {
    //get single SuperHero      
    ctx.body = await sph.getSingle(ctx.params.id);
    ctx.status = 200;
  })
  router.post('/', app.ensureAdmin, async (ctx, next) => {
    //create SuperHero
    ctx.body = await sph.create(ctx.request.body, ctx.req.user);
    ctx.status = 201;
  })
  router.put('/:id', app.ensureAdmin, async (ctx, next) => {
    //update SuperHero
    const SuperHero = ctx.request.body;
    SuperHero.id = ctx.params.id;
    ctx.body = await sph.update(SuperHero, ctx.req.user);
    ctx.status = 200;
  })
  router.del('/:id', app.ensureAdmin, async (ctx, next) => {
    //delete SuperHero

    ctx.body = await sph.drop(ctx.params.id, ctx.req.user);
    ctx.status = 200;
  });
  return router;
};