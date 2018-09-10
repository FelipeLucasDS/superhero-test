const Sequelize = require('../../lib/helpers/sequelize');

module.exports = app => {
	app.db = app.db || Sequelize(app);
	app.db.sequelize.sync({force:true}).done();
};
