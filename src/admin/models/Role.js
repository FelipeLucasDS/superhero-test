
const Sequelize = require('sequelize');
const bcrypt = require('../../lib/helpers/bcrypt');

module.exports = (sequelize, DataType) => {

	const role = sequelize.define('Role', {
		name: {
			type:   DataType.ENUM,
			values: ['ADMIN', 'STANDARD']
		}
	}, { timestamps: false });

	return role;
};
