
const cors = require('@koa/cors');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');
const HttpStatus = require('../lib/helpers/http').status;

const fs = require('fs');
const Authorization = require('./authorization');
const Sequelize = require('./sequelize');
const Logger = require('./logger');

module.exports = app => {
	app.config = JSON.parse(fs.readFileSync('./src/config/config.json'));

	app.use(cors({
		methods: [ 'GET', 'POST', 'PUT', 'DELETE' ],
		allowedHeaders: [ 'Content-Type', 'Authorization' ]
	}));

	app.use(bodyParser({
		jsonLimit: '50mb'
	}));
	app.use(async ctx => {
		// the parsed body will store in ctx.request.body
		// if nothing was parsed, body will be an empty object {}
		ctx.body = ctx.request.body;
	  });
	  
	app.use(helmet());
	app.use(Sequelize);
	app.use(Logger);

	app.auth = Authorization(app);
	app.use(app.auth.initialize());
};
