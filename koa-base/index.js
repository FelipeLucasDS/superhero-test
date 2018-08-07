const http = require('http');
const app = new (require('koa'))();
const router = require('./api/routes/routes');
  
app
  .use(router.routes())
  .use(router.allowedMethods());

app.on('error', err => {
   log.error('server error', err)
});

http.createServer(app.callback()).listen(3000);
