/**
 * Provides User repositories
 * @module src/admin/routes/versions/1.0/repository/User
 */

module.exports = app => {

    const UserModel = app.db.User;

    const count = async () => {
        return await UserModel.count();
    }

    const getAll = async (limit, offset) => {
        return await UserModel.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            $sort: { id: 1 }
          });
    }

    const getSingle = async (id) => {
        return await UserModel.findById(id);
    }

    const getByName = async (username) => {
        return await  UserModel.findOne({ where: { username } })
    }

    const create = async (superpower, transaction) => {
        return await UserModel.create(superpower, {transaction});
    }

    const update = async (superpower, transaction ) => {
        return await UserModel.findById(superpower.id)
        .then((sp)=>{
            return sp.update(superpower, {transaction});
        })
    }

    const drop = async (id, transaction) => {
        return await UserModel.destroy({ where: {id} }, {transaction})
    }
    return {
        count, getAll, getSingle, create, update, drop, getByName
    };
};