const AuditRepo = require("../repository/audit")

module.exports = app => {

    const Audit = app.db.Audit;
    const auditRepo = AuditRepo(app);
    const sequelize = app.db.sequelize;

    const create = async (audit, t)  => {
        return await auditRepo.create(audit, t);
    }

    const createBuild = async (entity, entityId, action, username, t) => {
        
        console.log('saving')
        return await auditRepo.create({
            entity,
            entityId,
            action,
            username
        }, t);
    }

    return {
        create,
        createBuild
    };
};