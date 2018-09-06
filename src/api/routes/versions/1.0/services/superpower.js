const SuperPowerRepo = require("../repository/superpower")

module.exports = app => {

    const SuperPower = app.db.SuperPower;
    const spRepo = SuperPowerRepo(app);
    const sequelize = app.sequelize;

    class SuperPowerService {

        async getAll (limit, order, where) {
            return spRepo.getAll(limit, order, where);
        }
    
        async getSingle(id) {
            return spRepo.getSingle(id);
        }
    
        async create (superpower) {
            return sequelize.transaction().then(function (t) {
                return spRepo.create(superpower, t)
                .then(() => {
                    return t.commit();
                }).catch((err) => {
                    return t.rollback();
                });
            });
        }
    
        async update (superpower){
            return sequelize.transaction().then(function (t) {
                return spRepo.update(superpower, t)
                .then(() => {
                    return t.commit();
                }).catch((err) => {
                    return t.rollback();
                });
            });
        }
    
        async delete (id) {
            return sequelize.transaction().then(function (t) {
                return spRepo.delete(id, t)
                .then(() => {
                    return t.commit();
                }).catch((err) => {
                    return t.rollback();
                });
            });
        }
    };
    return SuperPowerService;
};