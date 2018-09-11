module.exports = app => {

    const RoleModel = app.db.Role;

    const count = async () => {
        return await RoleModel.count();
    }

    const getAll = async (limit, offset) => {
        return await RoleModel.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            $sort: { id: 1 }
          });
    }

    const getSingle = async (id) => {
        return await RoleModel.findById(id);
    }

    const getByName = async (name) => {
        return await  RoleModel.findOne({ where: { name } })
    }

    const create = async (superpower, transaction) => {
        return await RoleModel.create(superpower, {transaction});
    }

    const update = async (superpower, transaction ) => {
        return await RoleModel.findById(superpower.id)
        .then((sp)=>{
            return sp.update(superpower, {transaction});
        })
    }

    const drop = async (id, transaction) => {
        return await RoleModel.destroy({ where: {id} }, {transaction})
    }
    return {
        count, getAll, getSingle, create, update, drop, getByName
    };
};