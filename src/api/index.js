
const cors = require('@koa/cors');
var jwt = require('koa-jwt');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');



module.exports = app => {
	app.use(cors({
		methods: [ 'GET', 'POST', 'PUT', 'DELETE' ],
		allowedHeaders: [ 'Content-Type', 'Authorization' ]
	}));

	app.use(bodyParser({
		jsonLimit: '50mb'
	}));

	app.use(helmet());
};
