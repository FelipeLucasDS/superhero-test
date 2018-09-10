module.exports = app => {

    const SuperHeroPowers = app.db.SuperHeroesPowers;

    const getBySuperHero = async (superHeroId) => {
        return await SuperHeroPowers.findAll({ where: { superHeroId } })
    }

    const getBySuperPower = async (superPowerId) => {
        return await SuperHeroPowers.findAll({ where: { superPowerId } })
    }

    const create = async (superHeroPowers, transaction) => {
        return await SuperHeroPowers.create(superHeroPowers, {transaction});
    }

    const drop = async (superHeroPowers, transaction) => {
        const where = {};
        if(superHeroPowers.superHeroId){
            where.superHeroId = superHeroPowers.superHeroId
        }
        if(superHeroPowers.superPowerId){
            where.superPowerId = superHeroPowers.superPowerId
        }
        return await SuperHeroPowers.destroy({ where }, {transaction})
    }
    return {
        getBySuperHero, getBySuperPower, create, drop
    };
};