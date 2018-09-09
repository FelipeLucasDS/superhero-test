const SuperHeroRepo = require("../repository/SuperHero")
const AuditService = require("./Audit");

module.exports = app => {

    const SuperHero = app.db.SuperHero;
    const spRepo = SuperHeroRepo(app);
    const auditService = AuditService(app);
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
    
    const create = async (SuperHero, user)  => {
        return await sequelize.transaction().then(function (t) {
                return spRepo.create(SuperHero, t)
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

    const update = async (SuperHero, user) => {
        return await sequelize.transaction().then(function (t) {
            return spRepo.update(SuperHero, t)
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
                        name: SuperHero.getTableName()
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