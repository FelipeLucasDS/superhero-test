const router = new(require('koa-router'))();
const convert = require('koa-convert')
const jwt = require('koa-jwt');
const SuperPowerService = require("../services/SuperPower");

/**
 * Provides Superpowers endpoints
 * @module src/api/routes/versions/1.0/routes/SuperPower
 */

module.exports = app => {

  const sps = SuperPowerService(app);


  /**
   * Search by paginated superpowers.
   * @param {String} ctx.query.page Page requested.
   * @param {String} ctx.query.limit Limit per page.
   */
  router.get('/', async (ctx, next) => {
    //get all superpowers paginated
    const user = ctx.req.user;
    let page = ctx.query.page || 1; // page number
    let limit = ctx.query.limit || 50;

    ctx.body = await sps.getAll(limit, page);
    ctx.status = 200;
  })

  /**
   * Search by a specific superpower.
   * @param {String} ctx.params.id Superhero requested.
   */
  router.get('/:id', async (ctx, next) => {
    //get single superpower      
    ctx.body = await sps.getSingle(ctx.params.id);
    ctx.status = 200;
  })

  /**
   * Create a superpower, needs to be an admin.
   * @param {String} ctx.request.body Superhero to create.
   */
  router.post('/', app.ensureAdmin, async (ctx, next) => {
    //create superpower
    ctx.body = await sps.create(ctx.request.body, ctx.req.user);
    ctx.status = 201;
  })

  /**
   * Update a superpower, needs to be an admin.
   * @param {String} ctx.request.body Superhero to update.
   * @param {String} ctx.params.id Superhero requested.
   */
  router.put('/:id', app.ensureAdmin, async (ctx, next) => {
    //update superpower

    const superPower = ctx.request.body;
    superPower.id = ctx.params.id;
    ctx.body = await sps.update(superPower, ctx.req.user);
    ctx.status = 200;
  })

  /**
   * Delete a superpower, needs to be an admin.
   * @param {String} ctx.params.id Superhero to delete.
   */
  router.del('/:id', app.ensureAdmin, async (ctx, next) => {
    //delete superpower

    ctx.body = await sps.drop(ctx.params.id, ctx.req.user);
    ctx.status = 200;
  });
  return router;
};