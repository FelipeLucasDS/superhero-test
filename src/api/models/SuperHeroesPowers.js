
module.exports = (sequelize, DataType) => {

	const SuperHeroesPowers = sequelize.define('SuperHeroesPowers', {
		superHeroId: {
			type: DataType.INTEGER,
			unique: false
		},
		superPowerId: {
			type: DataType.INTEGER,
			unique: false
		}
	}, { timestamps: false });

	return SuperHeroesPowers;
};
