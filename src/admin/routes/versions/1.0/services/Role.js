const RoleRepo = require("../repository/Role")
const AuditService = require("./Audit");

module.exports = app => {
    const Role = app.db.Role;
    const userRepo = RoleRepo(app);
    const auditService = AuditService(app);
    const sequelize = app.db.sequelize;

    const getAll = async (limit, page) => {
        const offset = limit * (page - 1);
       
        const [data, count] = await Promise.all([
            await userRepo.getAll(limit, offset),
            await userRepo.count()
        ])

        const pages = Math.ceil(count / limit);

        return {
            data,
            page: {page, pages}
        };
    }
    
    const getSingle = async (id) => {
        const user = await userRepo.getSingle(id);
        if(user)
            return user;

        app.errors.createException(app.errors.messages.common.error.not_found);
    }

    const getByName = async (id) => {
        const user = await userRepo.getByName(id);
        if(user)
            return user;

        app.errors.createException(app.errors.messages.common.error.not_found);
    }
    
    const create = async (Role, user)  => {
        return await sequelize.transaction().then(function (t) {
                return userRepo.create(Role, t)
            .then(function (usr) {
               return auditService.createBuild(usr, 'CREATE', user ? user.username : usr.username, t)
            }).then(function (usr) {
                t.commit();
                usr.password = undefined;
                return usr;
            }).catch(function (err) {
                console.log(err)
                t.rollback(); 
                app.errors.createException(app.errors.create.error);
            });
        });
    }

    const update = async (Role, user) => {
        return await sequelize.transaction().then(function (t) {
            return userRepo.update(Role, t)
            .then(function (usr) {
                return auditService.createBuild(usr, 'UPDATE', user.username, t)
            }).then(function (usr) {
                t.commit();
                return usr;
            }).catch(function (err) {
                console.log(err)
                t.rollback(); 
            });
        });
    }

    const drop = async (id, user)  => {
        return await sequelize.transaction().then(function (t) {
            return userRepo.drop(id, t)
            .then(function () {
                return auditService.createBuild({
                    id,
                    constructor: {
                        name: Role.getTableName()
                    }
                }, 'DELETE', user.username, t)
            }).then(function (usr) {
                t.commit();
                return usr;
            }).catch(function (err) {
                console.log(err)
                t.rollback(); 
            });
        });
    }

    return {
        getAll, getSingle, create, update, drop, getByName
    };
};