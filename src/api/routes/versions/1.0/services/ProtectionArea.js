const ProtectionAreaRepo = require("../repository/ProtectionArea")
const AuditService = require("./Audit");

module.exports = app => {

    const ProtectionArea = app.db.ProtectionArea;
    const spRepo = ProtectionAreaRepo(app);
    const auditService = AuditService(app);
    const sequelize = app.db.sequelize;

    const getAll = async (limit, page) => {
        const offset = limit * (page - 1);
       
        const [data, count] = await Promise.all([
            await spRepo.getAll(limit, offset),
            await spRepo.count()
        ])

        const pages = Math.ceil(count / limit);

        return {
            data,
            page: {page, pages}
        };
    }
    
    const getSingle = async (id) => {
            return spRepo.getSingle(id);
        }
    
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
        getAll, getSingle, create, update, drop
    };
};