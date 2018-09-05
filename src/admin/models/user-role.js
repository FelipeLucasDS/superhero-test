module.exports = (sequelize, DataType) => {

	const UserRole = sequelize.define('UserRole', {
		id: {
			type: DataType.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type:   DataType.ENUM,
			values: ['ADMIN', 'STANDARD']
		}
	}, { timestamps: false });

	return UserRole;
}
