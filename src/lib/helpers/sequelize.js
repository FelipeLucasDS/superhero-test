
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(__filename);

module.exports = app => {

	app.config.db.params.port =  process.env.DB_PORT || app.config.db.params.port;
	app.config.db.params.host =  process.env.DB_HOST || app.config.db.params.host;

	const sequelize = new Sequelize(
		process.env.DB_NAME || app.config.db.database,
		process.env.DB_USER || app.config.db.username,
		process.env.DB_PASSWORD ||  app.config.db.password,
		app.config.db.params,
	);

	const db = {
		sequelize,
		Sequelize,
		models: {}
	};

	fs.readdirSync(__dirname+"/../../api/models")
	.filter(file => {
		return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
	})
	.forEach(file => {
		var model = sequelize['import'](path.join(__dirname+"/../../api/models", file));
		db[model.name] = model;
	});

	fs.readdirSync(__dirname+"/../../admin/models")
	.filter(file => {
		return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
	})
	.forEach(file => {
		var model = sequelize['import'](path.join(__dirname+"/../../admin/models", file));
		db[model.name] = model;
	});

	Object.keys(db).forEach(modelName => {
		if (db[modelName].associate) {
			db[modelName].associate(db);
		}
	});

	sequelize.sync({force:true});


	db.sequelize = sequelize;
	db.Sequelize = Sequelize;

	return db;
};
