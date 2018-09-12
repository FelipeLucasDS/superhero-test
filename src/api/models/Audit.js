
module.exports = (sequelize, DataType) => {

	const ProtectionArea = sequelize.define('Audit', {
		id: {
			type: DataType.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		entity: {
			type: DataType.STRING,
			allowNull: false
		},
		entityId: {
			type: DataType.STRING
		},
		datetime: {
            type: DataType.DATE, 
            defaultValue: DataType.NOW
		},
		username: {
			type: DataType.STRING
        },
		action: {
			type:   DataType.ENUM,
			values: ['CREATE', 'UPDATE', 'DELETE']
		}
	}, { 
		timestamps: false
	});

	return ProtectionArea;
}
