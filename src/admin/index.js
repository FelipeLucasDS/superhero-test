const fs = require('fs');
var jwt = require('koa-jwt');
const session = require('koa-session2');
const passport = require('koa-passport');
const auth = require('./helper/auth');
    
module.exports = app => {    
    
    app.use(passport.initialize());
    app.use(passport.session());
    auth(app);

    app.ensureAdmin = async (ctx, next) =>{

        if(ctx.isAuthenticated() 
            && ctx.req.user.role.name === 'ADMIN'){
            await next()
        }else{
            const err = new Error();
            err.status = 401;
            err.message = 'Unauthorized';
            throw err;
        }
    }
   
    // Middleware below this line is only reached if JWT token is valid
    app.use(jwt({ secret: fs.readFileSync(app.config.auth.keyPath) })
        .unless({ path: [/^\/public/] }));


}