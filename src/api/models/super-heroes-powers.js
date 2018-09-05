
module.exports = (sequelize, DataType) => {

	const SuperHeroesPowers = sequelize.define('SuperHeroesPowers', {
		superHeroId: {
			type: DataType.INTEGER
		},
		superPowerId: {
			type: DataType.INTEGER
		}
	}, {
		tableName: 'SuperHeroesPowers'
	});

	return SuperHeroesPowers;
};
