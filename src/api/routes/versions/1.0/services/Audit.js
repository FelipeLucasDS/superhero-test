const AuditRepo = require("../repository/Audit")
/**
 * Provides Audit services
 * @module src/api/routes/versions/1.0/services/SuperPower
 */

module.exports = app => {

    const Audit = app.db.Audit;
    const auditRepo = AuditRepo(app);
    const sequelize = app.db.sequelize;

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
        createBuild
    };
};