
const cors = require('@koa/cors');
var jwt = require('koa-jwt');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');
const HttpStatus = require('../lib/helpers/http').status;

const Logger = require('./middleware/logger');

module.exports = app => {
	app.use(cors({
		methods: [ 'GET', 'POST', 'PUT', 'DELETE' ],
		allowedHeaders: [ 'Content-Type', 'Authorization' ]
	}));

	app.use(bodyParser({
		jsonLimit: '50mb'
	}));

	app.use(helmet());
	Logger(app);

	app.start();
};
