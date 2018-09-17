const http2 = require('http2');
const router = new(require('koa-router'))();
const fs = require('fs');

const server = http2.createSecureServer({
    key: fs.readFileSync('src/pem/localhost-privkey.pem'),
    cert: fs.readFileSync('src/pem/localhost-cert.pem')
  });


/**
 * Provide swagger route
 * @module src/lib/middleware/swagger
 */
module.exports = app => {

    app.use(ctx => {
        ctx.body = 'Hello Koa';
      });
      
    server.on('error', (err) => console.error(err));

    server.on('stream', (stream, headers) => {
      // stream is a Duplex
      stream.respond({
        'content-type': 'text/html',
        ':status': 200
      });
      stream.end('<h1>Hello World</h1>');
    });
    
    server.listen(8443);    
    console.log('listening '+8443)
}