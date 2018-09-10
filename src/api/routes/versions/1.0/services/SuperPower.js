const SuperPowerRepo = require("../repository/SuperPower")
const AuditService = require("./Audit");
const SuperPowerValidator = require("./validator/SuperPower");
const SuperHeroService = require("./SuperHero");

module.exports = app => {

    const SuperPower = app.db.SuperPower;
    const spRepo = SuperPowerRepo(app);
    const auditService = AuditService(app);
    const superHeroService = SuperHeroService(app);
    const validator = SuperPowerValidator(app, spRepo);
    const sequelize = app.db.sequelize;

    const getAll = async (limit, page) => {
        const offset = limit * (page - 1);
       
        const [data, count] = await Promise.all([
            await spRepo.getAll(limit, offset),
            await spRepo.count()
        ])

        const pages = Math.ceil(count / limit);

        return {
            data,
            page: {page, pages}
        };
    }
    
    const getSingle = async (id) => {
        return spRepo.getSingle(id);
    }
    
    const create = async (SuperPower, user)  => {
        await validator.create(SuperPower, superHeroService);
        
        return await sequelize.transaction().then(function (t) {
                return spRepo.create(SuperPower, t)
            .then(function (sp) {
                return auditService.createBuild(sp, 'CREATE', user.username, t)
            }).then(function (sp) {
                t.commit();
                return sp;
            }).catch(function (err) {
                console.log(err)
                t.rollback(); 
            });
        });
    }

    const update = async (SuperPower, user) => {
        console.log(superHeroService);
        await validator.update(SuperPower, superHeroService);
        
        return await sequelize.transaction().then(function (t) {
            return spRepo.update(SuperPower, t)
            .then(function (sp) {
                return auditService.createBuild(sp, 'UPDATE', user.username, t)
            }).then(function (sp) {
                t.commit();
                return sp;
            }).catch(function (err) {
                console.log(err)
                t.rollback(); 
            });
        });
    }

    const drop = async (id, user)  => {
        console.log(superHeroService);
        await validator.drop(id, superHeroService);
        
        return await sequelize.transaction().then(function (t) {
            return spRepo.drop(id, t)
            .then(function () {
                return auditService.createBuild({
                    id,
                    constructor: {
                        name: SuperPower.getTableName()
                    }
                }, 'DELETE', user.username, t)
            }).then(function (sp) {
                t.commit();
                return sp;
            }).catch(function (err) {
                console.log(err)
                t.rollback(); 
            });
        });
    }

    const getByName = async (name) => {
        if(Array.isArray(name)){
            return await spRepo.getByNames(name);
        }
        return await spRepo.getByName(name);
    }

        
    const dropBySuperHeroId = async (id, user) => {
        const transaction = await sequelize.transaction();
        try{
            //const superHeroPower = await superHeroesPowersService.create(SuperHeroPowers, user, transaction);
            await transaction.commit();
            //return superHeroPower;
        }catch(err){
            await transaction.rollback();
            throw err;
        }
         
    }

    return {
        getAll, getSingle, create, update, drop, getByName, dropBySuperHeroId
    };
};
