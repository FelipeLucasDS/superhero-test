const router = new(require('koa-router'))();
const convert = require('koa-convert')
const jwt = require('koa-jwt');
const UserService = require("../services/User");

/**
 * Provides User endpoints
 * @module src/admin/routes/versions/1.0/routes/User
 */

module.exports = app => {

  const userService = UserService(app);
  /**
   * Search by paginated users, needs to be an admin..
   * @param {String} ctx.query.page Page requested.
   * @param {String} ctx.query.limit Limit per page.
   */
  router.get('/', app.ensureAdmin, async (ctx, next) => {
    //get all Users paginated
    const user = ctx.req.user;

    let page = ctx.query.page || 1; // page number
    let limit = ctx.query.limit || 50;

    ctx.body = await userService.getAll(limit, page);
    ctx.status = 200;
  })

  /**
   * Search by a specific user, needs to be an admin.
   * @param {String} ctx.params.id User requested.
   */
  router.get('/:id', app.ensureAdmin, async (ctx, next) => {
    //get single User      
    ctx.body = await userService.getSingle(ctx.params.id);
    ctx.status = 200;
  })

  /**
   * Create a user, needs to be an admin.
   * @param {String} ctx.request.body User to create.
   */
  router.post('/', app.ensureAdmin, async (ctx, next) => {
    //create User
    ctx.body = await userService.create(ctx.request.body, ctx.req.user);
    ctx.status = 201;
  })

  /**
   * Update a user, needs to be an admin.
   * @param {String} ctx.request.body User to update.
   * @param {String} ctx.params.id User requested.
   */
  router.put('/:id', app.ensureAdmin, async (ctx, next) => {
    //update User

    const User = ctx.request.body;
    User.id = ctx.params.id;
    ctx.body = await userService.update(User, ctx.req.user);
    ctx.status = 200;
  })

  /**
   * Delete a user, needs to be an admin.
   * @param {String} ctx.params.id User to delete.
   */
  router.del('/:id', app.ensureAdmin, async (ctx, next) => {
    //delete User

    ctx.body = await userService.drop(ctx.params.id, ctx.req.user);
    ctx.status = 200;
  });
  return router;
};