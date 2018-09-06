const SuperPowerRepo = require("../repository/superpower")

module.exports = app => {

    const SuperPower = app.db.SuperPower;
    const spRepo = SuperPowerRepo(app);
    const sequelize = app.sequelize;

    const getAll = async (limit, order, where) => {
        return spRepo.getAll(limit, order, where);
    }
    
    const getSingle = async (id) => {
            return spRepo.getSingle(id);
        }
    
    const create = async (superpower)  => {
        return sequelize.transaction().then(function (t) {
            return spRepo.create(superpower, t)
            .then(() => {
                return t.commit();
            }).catch((err) => {
                return t.rollback();
            });
        });
    }

    const update = async (superpower) => {
        return sequelize.transaction().then(function (t) {
            return spRepo.update(superpower, t)
            .then(() => {
                return t.commit();
            }).catch((err) => {
                return t.rollback();
            });
        });
    }

    const drop = async (id)  => {
        return sequelize.transaction().then(function (t) {
            return spRepo.drop(id, t)
            .then(() => {
                return t.commit();
            }).catch((err) => {
                return t.rollback();
            });
        });
    }

    return {
        getAll, getSingle, create, update, drop
    };
};