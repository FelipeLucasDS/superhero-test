
module.exports = (sequelize, DataType) => {

	const ProtectionArea = sequelize.define('ProtectionArea', {
		id: {
			type: DataType.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataType.STRING,
			allowNull: false,
			unique: true
		},
		lat: {
			type: DataType.STRING,
			allowNull: false
		},
		long: {
			type: DataType.STRING,
			allowNull: false
		},
		radius: {
			type: DataType.INTEGER,
			allowNull: false
		}
	}, { timestamps: false });

	return ProtectionArea;
}
