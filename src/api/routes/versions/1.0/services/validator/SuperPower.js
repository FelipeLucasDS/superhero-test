module.exports = (app, repo) => {

    const superPowerNecessary = ['name', 'description'];
    
    const create = async (superPower) => {
        const missingInsuperPower = superPowerNecessary
            .filter((key) => {
                return !Object.keys(superPower).includes(key)
            });
        

        if(missingInsuperPower.length != 0
            || missingInsuperPower.length != 0){
            app.errors.createException(app.errors.messages.common.error.missing_information,             
                missingInsuperPower
                    .reduce((accum, curr) => accum + ", "+curr ));
        }
        const foundSuperPower = await repo.getByName(superPower.name);
        if(foundSuperPower){
            app.errors.createException(app.errors.messages.superpower.create.exists);            
        }
    }

    const update = async (superPower) => {

        const missingInsuperPower = superPowerNecessary
            .filter((key) => {
                return !Object.keys(superPower).includes(key)
            });
                

        if(missingInsuperPower.length != 0){
            app.errors.createException(app.errors.messages.common.error.missing_information,             
                missingInsuperPower
                    .reduce((accum, curr) => accum + ", "+curr ));
        }

        const foundSuperPower = await repo.getByName(superPower.name);

        if(foundSuperPower && superPower.id != foundSuperPower.id){
            app.errors.createException(app.errors.messages.superpower.update.exists);            
        }
    }

    const drop = async (id, superHeroesPowersService) => {
        const [foundSuperPower, superHeroPowers] = await Promise.all([ 
            repo.getSingle(id),
            superHeroesPowersService.getBySuperPower(id)
        ]);
        if(!foundSuperPower){
            app.errors.createException(app.errors.messages.superpower.delete.not_exists);            
        }
        
        if(superHeroPowers){
            app.errors.createException(app.errors.messages.superpower.delete.exists);            
        }
    }

    return {create, update, drop}
}