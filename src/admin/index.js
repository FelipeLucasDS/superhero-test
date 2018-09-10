const fs = require('fs');
var jwt = require('koa-jwt');
const session = require('koa-session');
const passport = require('koa-passport');
const auth = require('./helper/auth');
    
module.exports = app => {    
    
    app.use(passport.initialize());
    app.use(passport.session());
    auth(app);

    // Custom 401 handling if you don't want to expose koa-jwt errors to users
    app.use((ctx, next)=>{
        return next().catch((err) => {
        console.log('here,',err)
        if (err.status == 401) {
            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization Bearer header to get access\n';
        } if (err.status) {
            ctx.status = err.status;
            ctx.body = err.msg;
        } else {
            console.log('here')
            throw err;
        }
        });
    });

    app.ensureAdmin = async (ctx, next) =>{
        if(ctx.isAuthenticated() 
            && ctx.req.user.role === 'ADMIN'){
            await next()
        }else{
            const err = new Error();
            err.status = 401;
            throw err;
        }
    }
    
    // Middleware below this line is only reached if JWT token is valid
    app.use(jwt({ secret: fs.readFileSync(app.config.auth.keyPath) })
        .unless({ path: [/^\/public/] }));


}