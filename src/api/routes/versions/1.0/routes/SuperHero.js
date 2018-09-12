const router = new(require('koa-router'))();
const convert = require('koa-convert')
const jwt = require('koa-jwt');
const SuperHeroService = require("../services/SuperHero");

/**
 * Provides Superheroes endpoints
 * @module src/api/routes/versions/1.0/routes/SuperHero
 */

module.exports = app => {

  const sph = SuperHeroService(app);

  /**
   * Search by paginated superheroes.
   * @param {String} ctx.query.page Page requested.
   * @param {String} ctx.query.limit Limit per page.
   */
  router.get('/', async (ctx, next) => {
    //get all SuperHeros paginated
    const user = ctx.req.user;

    let page = ctx.query.page || 1; // page number
    let limit = ctx.query.limit || 50;
    ctx.body = await sph.getAll(limit, page);
    ctx.status = 200;
  })

  /**
   * Search by a specific superhero.
   * @param {String} ctx.params.id Superhero requested.
   */
  router.get('/:id', async (ctx, next) => {
    //get single SuperHero      
    ctx.body = await sph.getSingle(ctx.params.id);
    ctx.status = 200;
  })

  /**
   * Create a superhero, needs to be an admin.
   * @param {String} ctx.request.body Superhero to create.
   */
  router.post('/', app.ensureAdmin, async (ctx, next) => {
    //create SuperHero
    ctx.body = await sph.create(ctx.request.body, ctx.req.user);
    ctx.status = 201;
  })

  /**
   * Update a superhero, needs to be an admin.
   * @param {String} ctx.request.body Superhero to update.
   * @param {String} ctx.params.id Superhero requested.
   */
  router.put('/:id', app.ensureAdmin, async (ctx, next) => {
    //update SuperHero
    const SuperHero = ctx.request.body;
    SuperHero.id = ctx.params.id;
    ctx.body = await sph.update(SuperHero, ctx.req.user);
    ctx.status = 200;
  })
  /**
   * Delete a superhero, needs to be an admin.
   * @param {String} ctx.params.id Superhero to delete.
   */
  router.del('/:id', app.ensureAdmin, async (ctx, next) => {
    //delete SuperHero

    ctx.body = await sph.drop(ctx.params.id, ctx.req.user);
    ctx.status = 200;
  });
  return router;
};