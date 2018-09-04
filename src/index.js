const http = require('http');
const app = new (require('koa'))();
const router = require('./api/routes/routes');
const logger = require('koa-logger')

const errorHandler = require('./api/middleware/errorHandler');
const middleware = require('./api/middleware/index');

app
.use(logger())
.use(router.routes())
.use(router.allowedMethods()); 

middleware(app);

app.on('error', errorHandler);

http.createServer(app.callback()).listen(3000);
