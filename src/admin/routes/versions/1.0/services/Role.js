const RoleRepo = require("../repository/Role")
/**
 * Provides Role services
 * @module src/admin/routes/versions/1.0/services/Role
 */
module.exports = app => {
    const roleRepo = RoleRepo(app);

    const getByName = async (name) => {
        const role = await roleRepo.getByName(name);
        if(role)
            return role;

        app.errors.createException(app.errors.messages.common.error.not_found);
    }
    return {
        getByName
    };
};