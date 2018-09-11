const http = require('http');
const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const router = require('./api/routes/routes');
const adminRouter = require('./admin/routes/routes');
const logger = require('koa-logger')

const errorHandler = require('./lib/middleware/errorHandler');
const Logger = require('./lib/middleware/logger');
const api = require('./api/index');
const admin = require('./admin/index');
const Sequelize = require('./lib/middleware/sequelize');
const error = require('./lib/helpers/errorHandling');

app.config = JSON.parse(fs.readFileSync('./src/config/config.json'));

// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use((ctx, next) => {
    return next().catch((err) => {
        if (err.status == 401 ||
            err.message === 'Authentication Error') {
            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization Bearer header to get access\n';
        }else if (err.status) {
            ctx.status = err.status;
            ctx.body = err.msg;
        } else {
            throw err;
        }
    });
});

Sequelize(app);
admin(app);
api(app);
app.errors = error;
app.use(logger());
app.use(router(app).routes());
app.use(adminRouter(app).routes());

app.on('error', errorHandler);

http.createServer(app.callback()).listen(process.env.ENV_PORT || 3001);

module.exports = app