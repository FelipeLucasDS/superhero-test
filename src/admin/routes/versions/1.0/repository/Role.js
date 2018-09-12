/**
 * Provides Role repositories
 * @module src/admin/routes/versions/1.0/repository/Role
 */

module.exports = app => {

    const RoleModel = app.db.Role;

    const getByName = async (name) => {
        return await  RoleModel.findOne({ where: { name } })
    }

    return {
        getByName
    };
};