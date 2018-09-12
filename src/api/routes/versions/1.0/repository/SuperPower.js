/**
 * Provides SuperPower repositories
 * @module src/api/routes/versions/1.0/repository/SuperPower
 */
module.exports = app => {

    const SuperPowerModel = app.db.SuperPower;

    const count = async () => {
        return await SuperPowerModel.count();
    }

    const getAll = async (limit, offset) => {
        return await SuperPowerModel.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            $sort: { id: 1 }
          });
    }

    const getSingle = async (id) => {
        return await SuperPowerModel.findById(id);
    }

    const getByNames = async (names) => {
        return await SuperPowerModel.findAll({ where: { name } })
    }

    const getByName = async (name) => {
        return await SuperPowerModel.findOne({ where: { name } })
    }

    const create = async (superpower, transaction) => {
        return await SuperPowerModel.create(superpower, {transaction});
    }

    const update = async (superpower, transaction ) => {
        return await SuperPowerModel.findById(superpower.id)
        .then((sp)=>{
            return sp.update(superpower, {transaction});
        })
    }

    const drop = async (id, transaction) => {
        return await SuperPowerModel.destroy({ where: {id} }, {transaction})
    }
    return {
        count, getAll, getSingle, create, update, drop, getByName, getByNames
    };
};