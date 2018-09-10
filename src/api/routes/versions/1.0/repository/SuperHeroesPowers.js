module.exports = app => {

    const SuperHeroPowers = app.db.SuperHeroesPowers;

    const getBySuperHero = async (superHeroId) => {
        return await SuperHeroPowers.findAll({ where: { superHeroId } })
    }

    const getBySuperPower = async (superPowerId) => {
        return await SuperHeroPowers.findAll({ where: { superPowerId } })
    }

    const create = async (superHeroPowers, transaction) => {
        return await SuperHeroPowers.create({
            superHeroId: superHeroPowers.superHeroId,
            superPowerId: superHeroPowers.superPowerId
        }, {transaction});
    }

    const drop = async (superHeroPowers, transaction) => {
        return await SuperHeroPowers.destroy({ where: {
            superHeroId : superHeroPowers.superHeroId,
            superPowerId: superHeroPowers.superPowerId
        }}, {transaction})
    }
    return {
        getBySuperHero, getBySuperPower, create, drop
    };
};