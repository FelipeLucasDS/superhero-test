const AuditRepo = require("../repository/Audit")

module.exports = app => {

    const Audit = app.db.Audit;
    const auditRepo = AuditRepo(app);
    const sequelize = app.db.sequelize;

    const create = async (audit, t)  => {
        return await auditRepo.create(audit, t);
    }

    const createBuild = async (entity, action, username, t) => {
        await auditRepo.create({
            entity: entity.constructor.name,
            entityId: entity.id,
            action,
            username
        }, t);
        return entity
    }

    return {
        create,
        createBuild
    };
};