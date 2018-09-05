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
app.use(router.routes());
app.use(adminRouter.routes());
app.use(router.allowedMethods()); 



app.on('error', errorHandler);


console.log(process.env)

http.createServer(app.callback()).listen(3001);
