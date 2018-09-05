
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
var basename  = path.basename(__filename);

module.exports = app => {

	console.log(app.config.db)	

	const sequelize = new Sequelize(
		app.config.db.database,
		app.config.db.username,
		app.config.db.password,
		app.config.db.params
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


	return db;
};
