const routes = new (require('koa-router'))();

const user = require('./user');
const room = require('./room');

routes.use('/user', user.routes(), user.allowedMethods());
routes.use('/room', room.routes(), room.allowedMethods());

module.exports = routes;