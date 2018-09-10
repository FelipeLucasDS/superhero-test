module.exports = app => {

    const ProtectionAreaModel = app.db.ProtectionArea;

    const count = async () => {
        return await ProtectionAreaModel.count();
    }

    const getAll = async (limit, offset) => {
        return await ProtectionAreaModel.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            $sort: { id: 1 }
          });
    }

    const getSingle = async (id) => {
        return await ProtectionAreaModel.findById(id);
    }

    const getByName = async (name) => {
        return await  ProtectionAreaModel.findOne({ where: { name } })
    }

    const create = async (protectionArea, transaction) => {
        return await ProtectionAreaModel.create(protectionArea, {transaction});
    }

    const update = async (protectionArea, transaction ) => {
        return await ProtectionAreaModel.findById(protectionArea.id)
        .then((sp)=>{
            return sp.update(protectionArea, {transaction});
        })
    }

    const drop = async (id, transaction) => {
        return await ProtectionAreaModel.destroy({ where: {id} }, {transaction})
    }
    return {
        count, getAll, getSingle, create, update, drop, getByName
    };
};