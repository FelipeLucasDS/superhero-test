const SuperPowerRepo = require("../repository/superpower")
const AuditService = require("./audit");

module.exports = app => {

    const SuperPower = app.db.SuperPower;
    const spRepo = SuperPowerRepo(app);
    const auditService = AuditService(app);
    const sequelize = app.db.sequelize;

    const getAll = async (limit, order, where) => {
        return spRepo.getAll(limit, order, where);
    }
    
    const getSingle = async (id) => {
            return spRepo.getSingle(id);
        }
    
    const create = async (superpower, user)  => {
        return await sequelize.transaction().then(function (t) {
                return spRepo.create(superpower, t)
            .then(function (sp) {
                return auditService.createBuild(sp, 'CREATE', user.username, t)
            }).then(function (sp) {
                t.commit();
                return sp;
            }).catch(function (err) {
                console.log(err)
                return t.rollback();
            });
        });
    }

    const update = async (superpower, user) => {
        return await sequelize.transaction().then(function (t) {
            return spRepo.update(superpower, t)
            .then(function (sp) {
                return auditService.createBuild(sp, 'UPDATE', user.username, t)
            }).then(function (sp) {
                t.commit();
                return sp;
            }).catch(function (err) {
                console.log(err)
                return t.rollback();
            });
        });
    }

    const drop = async (id, user)  => {
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
                return t.rollback();
            });
        });
    }

    return {
        getAll, getSingle, create, update, drop
    };
};