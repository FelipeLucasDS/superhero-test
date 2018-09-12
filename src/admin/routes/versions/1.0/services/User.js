const UserRepo = require("../repository/User")
const AuditService = require("./Audit");
const RoleService = require("./Role");
const UserValidator = require("./validator/User");

/**
 * Provides User services
 * @module src/admin/routes/versions/1.0/services/User
 */
module.exports = app => {
    const User = app.db.User;
    const userRepo = UserRepo(app);
    const auditService = AuditService(app);
    const roleService = RoleService(app);
    const userValidator = UserValidator(app, userRepo);
    const sequelize = app.db.sequelize;

    const getAll = async (limit, page) => {
        const offset = limit * (page - 1);
       
        const [data, count] = await Promise.all([
            await userRepo.getAll(limit, offset),
            await userRepo.count()
        ])

        const pages = Math.ceil(count / limit);
        data.forEach(item => item.password = undefined)
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
    
    const create = async (UserModel, user)  => {
        await userValidator.create(UserModel);

        const role = await roleService.getByName(UserModel.role);
        
        UserModel.role = role.id;

        return await sequelize.transaction().then(function (t) {
                return userRepo.create(UserModel, t)
            .then(function (usr) {
               return auditService.createBuild(usr, 'CREATE', user ? user.username : usr.username, t)
            }).then(function (usr) {
                t.commit();
                usr.password = undefined;
                return usr;
            }).catch(function (err) {
                t.rollback();  
                throw err;
            });
        });
    }

    const update = async (UserModel, user) => {
        await userValidator.update(UserModel);
        
        const role = await roleService.getByName(UserModel.role);
        
        UserModel.role = role.id;
        
        return await sequelize.transaction().then(function (t) {
            return userRepo.update(UserModel, t)
            .then(function (usr) {
                return auditService.createBuild(usr, 'UPDATE', user.username, t)
            }).then(function (usr) {
                t.commit();
                return usr;
            }).catch(function (err) {
                t.rollback();  
                throw err;
            });
        });
    }

    const drop = async (id, user)  => {
        await userValidator.drop(id);

        return await sequelize.transaction().then(function (t) {
            return userRepo.drop(id, t)
            .then(function () {
                return auditService.createBuild({
                    id,
                    constructor: {
                        name: User.getTableName()
                    }
                }, 'DELETE', user.username, t)
            }).then(function (usr) {
                t.commit();
                return usr;
            }).catch(function (err) {
                t.rollback();  
                throw err;
            });
        });
    }

    return {
        getAll, getSingle, create, update, drop
    };
};