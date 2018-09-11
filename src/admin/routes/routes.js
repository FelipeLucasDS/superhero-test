const fs = require('fs');
const routes = new (require('koa-router'))();

const versionFolder = __dirname+'/versions/';
const routeFile = '/routes/';

var getAllRoutes = (app) => {
    let ver = fs.readdirSync(versionFolder);
    
    console.log('Registering ADMIN api: ')
    
    ver.forEach((file) => {
        let files = fs.readdirSync(versionFolder+file+routeFile);
        files.forEach((r) => {

            r  = r.replace('.js','');
            

            const versionRoutes = require("./versions/"+file+routeFile+r)(app);
            
            let api = '/'+file+'/api/'+r.toLowerCase();
            if(r.toLowerCase() === 'auth')
                api = '/public'+api;
            console.log(api);

            routes.use(api, 
                    versionRoutes.routes(), 
                    versionRoutes.allowedMethods()
                );
        });
    });
    
    return routes
};

module.exports  = (app) => getAllRoutes(app);