const router = new (require('koa-router'))();
const convert = require('koa-convert')
const jwt = require('koa-jwt');
const SuperPowerService = require("../services/superpower");

module.exports = app => {
  return router
    .get('/', (ctx, next) => {
      //get all superpowers paginated
      const user = ctx.req.user;
      const queryParams = ctx.query;
      ctx.body = 'ok'; 
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