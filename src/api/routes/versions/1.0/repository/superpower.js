module.exports = app => {

    const SuperPower = app.db.SuperPower;

    const getAll = async (limit, order, where) => {
        return await SuperPower.findAll();
    }

    const getSingle = async (id) => {
        return await SuperPower.findById(id);
    }

    const getByName = async (name) => {
        return await  SuperPower.findOne({ where: { name } })
    }

    const create = async (superpower, transaction) => {
        return await SuperPower.create(superpower, {transaction});
    }

    const update = async (superpower, transaction ) => {
        return await SuperPower.findOne({ where: superpower.id })
        .then((sp)=>{
            return sp.update(superpower, {transaction});
        })
    }

    const drop = async (id, transaction) => {
        return await Model.destroy({ where: {id} }, {transaction})
    }
    return {
        getAll, getSingle, create, update, drop, getByName
    };
};