/**
 * Provides Audit repositories
 * @module src/admin/routes/versions/1.0/repository/Audit
 */

module.exports = app => {

    const Audit = app.db.Audit;

    const create = async (audit, transaction) => {
        await Audit.create(audit, {transaction});
    }
    return {
        create
    };
};