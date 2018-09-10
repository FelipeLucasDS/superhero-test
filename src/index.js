const http = require('http');
const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const router = require('./api/routes/routes');
const adminRouter = require('./admin/routes/routes');
const logger = require('koa-logger')

const errorHandler = require('./api/middleware/errorHandler');
const api = require('./api/index');
const admin = require('./admin/index');
const Sequelize = require('./api/middleware/sequelize');

app.config = JSON.parse(fs.readFileSync('./src/config/config.json'));

Sequelize(app);

admin(app);
api(app);

app.use(logger());
app.use(router(app).routes());
app.use(adminRouter(app).routes());

app.on('error', errorHandler);

http.createServer(app.callback()).listen(process.env.ENV_PORT || 3001);

module.exports = app