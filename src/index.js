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

app.config = JSON.parse(fs.readFileSync('./src/config/config.json'));

admin(app);
api(app);
app.use(logger());
app.use(router.routes());
app.use(adminRouter.routes());
app.use(router.allowedMethods()); 



app.on('error', errorHandler);


http.createServer(app.callback()).listen(3001);
