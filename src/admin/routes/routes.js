const fs = require('fs');
const routes = new (require('koa-router'))();

const versionFolder = __dirname+'/versions/';
const routeFile = '/routes/';

var getAllRoutes = () => {
    let ver = fs.readdirSync(versionFolder);
    
    ver.forEach((file) => {
        let files = fs.readdirSync(versionFolder+file+routeFile);
        files.forEach((r) => {

            r  = r.replace('.js','');
            
            const versionRoutes = require("./versions/"+file+routeFile+r);
            
            console.log('Registering api: ')
            const api = '/public/'+file+'/api/'+r;
            console.log(api);

            routes.use(api, 
                    versionRoutes.routes(), 
                    versionRoutes.allowedMethods()
                );
        });
    });
    
    return routes
};

module.exports = getAllRoutes();