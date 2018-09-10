const SuperHeroRepo = require("../repository/SuperHero")
const AuditService = require("./Audit");
const ProtectionAreaService = require("./ProtectionArea");

module.exports = app => {

    const SuperHero = app.db.SuperHero;
    const superHeroRepo = SuperHeroRepo(app);
    const auditService = AuditService(app);
    const paService = ProtectionAreaService(app);
    const sequelize = app.db.sequelize;

    const getAll = async (limit, page) => {
        const offset = limit * (page - 1);
       
        const [data, count] = await Promise.all([
            await superHeroRepo.getAll(limit, offset),
            await superHeroRepo.count()
        ])

        const pages = Math.ceil(count / limit);

        return {
            data,
            page: {page, pages}
        };
    }
    
    const getSingle = async (id) => {
        return superHeroRepo.getSingle(id);
    }

    const getByName = async (nameid) => {
        return superHeroRepo.getByName(name);
    }
    
    const create = async (SuperHero, user)  => {
        const transaction = await sequelize.transaction();

        if (!SuperHero.protectionArea) {
            throw new Exception;//todo
        }
        try{
            const protectionArea = await paService.create(SuperHero.protectionArea, user, transaction);
            SuperHero.protectionAreaId = protectionArea.id;
            const superHero = await superHeroRepo.create(SuperHero, transaction);
            await auditService.createBuild(superHero, 'CREATE', user.username, transaction);
            await transaction.commit();
            return superHero;
        }catch(err){
            await transaction.rollback();
            throw err;
        }
    }

    const update = async (SuperHero, user) => {
        const transaction = await sequelize.transaction();
        try{
            const superHero = await superHeroRepo.update(SuperHero, transaction);
            if(SuperHero.protectionArea){
                SuperHero.protectionArea.id = superHero.protectionAreaId;
                const protectionArea = await paService.update(SuperHero.protectionArea, user, transaction);
            }
            await auditService.createBuild(superHero, 'UPDATE', user.username, transaction);
            await transaction.commit();
            return superHero;
        }catch(err){
            await transaction.rollback();
            throw err;
        }
    }

    const drop = async (id, user)  => {

        const transaction = await sequelize.transaction();
        try{
            const superHero = await superHeroRepo.getSingle(id);
            
            await Promise.all([
                superHeroRepo.drop(id, transaction),
                paService.drop(superHero.protectionAreaId, user, transaction),
                auditService.createBuild({
                    id,
                    constructor: {
                        name: SuperHero.getTableName()
                    }
                }, 'DELETE', user.username, transaction)
            ]);

            await transaction.commit();
            return superHero;
        }catch(err){
            await transaction.rollback();
            throw err;
        }
    }

    return {
        getAll, getSingle, create, update, drop, getByName
    };
};