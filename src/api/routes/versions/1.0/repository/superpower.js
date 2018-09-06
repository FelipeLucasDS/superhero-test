module.exports = app => {

    const SuperPower = app.db.SuperPower;

    class SuperPowerRepository {

        async getAll (limit, order, where) {
            return await SuperPower.findAll({
                limit: 100, 
                order,
                where
              });
        }
    
        async getSingle (id) {
            return await SuperPower.findById(id);
        }

        async getByName (name) {
            return await  SuperPower.findOne({ where: { name } })
        }
    
        async create (superpower, transaction) {
            await SuperPower.create(superpower, {transaction});
        }
    
        async update (superpower, transaction ){
            await SuperPower.findOne({ where: superpower.id })
            .then((sp)=>{
                return sp.update(superpower, {transaction});
            })
        }
    
        async delete (id, transaction) {
            await Model.destroy({ where: {id} }, {transaction})
        }
    };

    return SuperPowerRepository;
};