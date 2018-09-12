/**
 * Provides SuperHero repositories
 * @module src/api/routes/versions/1.0/repository/SuperHero
 */
module.exports = app => {

    const SuperHeroModel = app.db.SuperHero;

    const count = async () => {
        return await SuperHeroModel.count();
    }

    const getAll = async (limit, offset, include) => {
        return await SuperHeroModel.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            $sort: { id: 1 },
            include
          });
    }

    const getSingle = async (id, include) => {
        return await SuperHeroModel.findById(id, {
            include
        });
    }

    const getByName = async (name, include) => {
        return await  SuperHeroModel.findOne({ 
            include,
            where: { name } 
        })
    }

    const create = async (superpower, transaction) => {
        return await SuperHeroModel.create(superpower, {transaction});
    }

    const update = async (superpower, transaction ) => {
        return await SuperHeroModel.findById(superpower.id)
        .then((sp)=>{
            return sp.update(superpower, {transaction});
        })
    }

    const drop = async (id, transaction) => {
        return await SuperHeroModel.destroy({ where: {id} }, {transaction})
    }
    return {
        count, getAll, getSingle, create, update, drop, getByName
    };
};