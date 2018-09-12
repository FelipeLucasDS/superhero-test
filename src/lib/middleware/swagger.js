const swagger = require('swagger2');
const {ui} = require('swagger2-koa');

module.exports = app => {
    const document = swagger.loadDocumentSync('./public/api.yml');
    app.use(ui(document, "/public/swagger"));
}