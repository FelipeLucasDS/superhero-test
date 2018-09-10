const SuperHeroesPowersRepo = require("../repository/SuperHeroesPowers")
const AuditService = require("./Audit");

module.exports = app => {

    const SuperHeroPowers = app.db.SuperHeroPowers;
    const superHeroPowersRepo = SuperHeroesPowersRepo(app);
    const auditService = AuditService(app);
    const sequelize = app.db.sequelize;

    const getBySuperHero = async (superHeroId) => {
        return await superHeroPowersRepo.getBySuperHero(superHeroId)
    }

    const getBySuperPower = async (superPowerId) => {
        return await superHeroPowersRepo.getBySuperPower(superPowerId)
    }

    const create = async (superHeroPowers, user, transaction) => {
        await superHeroPowersRepo.create(superHeroPowers, transaction);

        superHeroPowers.id = JSON.stringify(superHeroPowers);

        return await auditService.createBuild(superHeroPowers, 'UPDATE', user.username, transaction)
    }

    const drop = async (superHeroPowers, user, transaction) => {
        await superHeroPowersRepo.drop(superHeroPowers, transaction)
        
        return await auditService.createBuild({
            id: JSON.stringify(superHeroPowers),
            constructor: {
                name: SuperHeroPowers.getTableName()
            }
        }, 'DELETE', user.username, transaction);
    }

    return {
        getBySuperHero, getBySuperPower, create, drop
    };
};