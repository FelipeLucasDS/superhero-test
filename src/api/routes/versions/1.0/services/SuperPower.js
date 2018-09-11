const SuperPowerRepo = require("../repository/SuperPower")
const SuperHeroesPowersService = require("../services/SuperHeroesPowers")
const AuditService = require("./Audit");
const SuperPowerValidator = require("./validator/SuperPower");

module.exports = app => {

    const SuperPower = app.db.SuperPower;
    const spRepo = SuperPowerRepo(app);
    const auditService = AuditService(app);
    const superHeroesPowersService = SuperHeroesPowersService(app);
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
        const superPower = await spRepo.getSingle(id);
        if(superPower)
            return superPower;

        app.errors.createException(app.errors.messages.common.error.not_found);
    }
    
    const create = async (SuperPower, user)  => {
        await validator.create(SuperPower);
        
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
        await validator.update(SuperPower);
        
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

        await validator.drop(id, superHeroesPowersService);
        
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

    return {
        getAll, getSingle, create, update, drop, getByName
    };
};
