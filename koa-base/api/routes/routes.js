const fs = require('fs');
const path = require('path');

const versionFolder = __dirname+'/versions';
const routeFile = '/routes/routes';

const routes = new (require('koa-router'))();

var getAllRoutes = function() {
    let ver = fs.readdirSync(versionFolder);
    ver.forEach(function(file) {
        fs.readdirSync(versionFolder);
        const versionRoutes = require("./versions/"+file+routeFile);
        routes.use('/'+file+'/api', versionRoutes.routes(), versionRoutes.allowedMethods());

    });
    return routes
};

module.exports = getAllRoutes();