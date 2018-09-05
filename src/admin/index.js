const fs = require('fs');
var jwt = require('koa-jwt');
const session = require('koa-session');
const passport = require('koa-passport');

module.exports = app => {    
    
    require('./helper/auth');
    app.use(passport.initialize());
    app.use(passport.session());


    // Custom 401 handling if you don't want to expose koa-jwt errors to users
    app.use((ctx, next)=>{
        return next().catch((err) => {
        if (401 == err.status) {
            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        } else {
            throw err;
        }
        });
    });
    
    // Middleware below this line is only reached if JWT token is valid
    app.use(jwt({ secret: fs.readFileSync(app.config.auth.keyPath) })
        .unless({ path: [/^\/public/] }));

    // Unprotected middleware
    app.use(function(ctx, next){
        console.log('ah'+ctx.url.match(/^\/public/))
        if (ctx.url.match(/^\/public/)) {
            return next();
        } else if (ctx.url.match(/^\/api/)) {
            console.log('middleware protected');
            return next();
        }
    });

}