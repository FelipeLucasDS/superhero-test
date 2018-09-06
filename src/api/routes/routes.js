const fs = require('fs');
const routes = new (require('koa-router'))();

const versionFolder = __dirname+'/versions/';
const routeFile = '/routes/';

module.exports = app => {
    let ver = fs.readdirSync(versionFolder);
    
    ver.forEach((file) => {
        let files = fs.readdirSync(versionFolder+file+routeFile);
        files.forEach((r) => {

            r  = r.replace('.js','');
            
            const versionRoutes = require("./versions/"+file+routeFile+r)(app);
            
            console.log('Registering api: ')
            console.log('/'+file+'/api/'+r);

            routes.use('/'+file+'/api/'+r, 
                    versionRoutes.routes(), 
                    versionRoutes.allowedMethods()
                );
        });
    });
    
    return routes
};