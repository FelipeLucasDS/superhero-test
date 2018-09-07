
const Sequelize = require('sequelize');
const bcrypt = require('../../lib/helpers/bcrypt');

module.exports = (sequelize, DataType) => {

	const User = sequelize.define('User', {
		id: {
			type: DataType.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataType.STRING,
			allowNull: false,
			unique: true
		},
		name: {
			type: DataType.STRING,
			allowNull: false
		},
		password: {
			type: DataType.STRING,
			allowNull: false,
		}
	}, { timestamps: false });

	User.hook('beforeCreate', async user => {
		user.password = bcrypt.encrypt(user.password);
	});

	User.hook('beforeUpdate', async user => {
		if (user.password) {
			user.password = bcrypt.encrypt(user.password);
		}
	});

	User.checkPassword = (plainPassword, encodedPassword) => {
		return bcrypt.checkPassword(plainPassword, encodedPassword);
	};

	User.associate = models => {
		User.belongsTo(models.Role, {
			foreignKey: {
				name: 'role',
				allowNull: false
			}
		});
	};

	return User;
};
