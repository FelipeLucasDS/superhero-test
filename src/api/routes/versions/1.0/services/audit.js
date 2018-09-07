const AuditRepo = require("../repository/audit")

module.exports = app => {

    const Audit = app.db.Audit;
    const auditRepo = AuditRepo(app);
    const sequelize = app.db.sequelize;

    const create = async (audit, t)  => {
        return await auditRepo.create(audit, t);
    }

    const createBuild = async (entity, action, username, t) => {
        await auditRepo.create({
            entity: entity.id,
            entityId: entity.constructor.name,
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