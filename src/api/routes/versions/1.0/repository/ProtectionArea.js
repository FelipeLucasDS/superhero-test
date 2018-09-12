/**
 * Provides ProtectionArea repositories
 * @module src/api/routes/versions/1.0/repository/ProtectionArea
 */

module.exports = app => {

    const ProtectionAreaModel = app.db.ProtectionArea;

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
        create, update, drop, getByName
    };
};