const router = new (require('koa-router'))();
const convert = require('koa-convert')
const jwt = require('koa-jwt');
const SuperPowerService = require("../services/superpower");

module.exports = app => {
  return router
    .get('/', (ctx, next) => {
      //get all superpowers paginated
      ctx.body = JSON.stringify(ctx);
      console.log(ctx.req.user)
      console.log(ctx.query)
      console.log(ctx.req.query)
      ctx.body.user = ctx.req;
      
    })
    .get('/:id', (ctx, next) => {
      //get single superpower
      
      ctx.body = 'rooms API!';
    })
    .post('/', (ctx, next) => {
      //create superpower

      ctx.body = 'rooms API!';
    })
    .put('/:id', (ctx, next) => {
      //update superpower

      ctx.body = 'rooms API!';
    })
    .del('/:id', (ctx, next) => {
      //delete superpower

      ctx.body = 'rooms API!';
    });
};