const ProtectionAreaRepo = require("../repository/ProtectionArea")
const AuditService = require("./Audit");

module.exports = app => {

    const ProtectionArea = app.db.ProtectionArea;
    const spRepo = ProtectionAreaRepo(app);
    const auditService = AuditService(app);
    const sequelize = app.db.sequelize;

    const create = async (ProtectionArea, user, t)  => {
        const sp = await spRepo.create(ProtectionArea, t)
        return await auditService.createBuild(sp, 'CREATE', user.username, t)
    }

    const update = async (ProtectionArea, user, t) => {
        const sp = await spRepo.update(ProtectionArea, t);
        return await auditService.createBuild(sp, 'UPDATE', user.username, t)
    }

    const drop = async (id, user, t)  => {
        await auditService.createBuild({
            id,
            constructor: {
                name: ProtectionArea.getTableName()
            }
        }, 'DELETE', user.username, t);

        return await spRepo.drop(id, t);
    }

    return {
        create, update, drop
    };
};