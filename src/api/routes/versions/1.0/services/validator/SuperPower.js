module.exports = (app, repo) => {

    const superPowerNecessary = ['name', 'description', 'superHeroId'];
    
    const create = async (superPower, superHeroService) => {
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
        if(!await superHeroService.getSingle(superPower.superHeroId)){
            app.errors.createException(app.errors.messages.superpower.create.hero_not_exists);            
        }
    }

    const update = async (superPower, superHeroService) => {

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

        if(!await superHeroService.getSingle(superPower.superHeroId)){
            app.errors.createException(app.errors.messages.superpower.create.hero_not_exists);            
        }
    }

    const drop = async (id, superHeroService) => {
        const foundSuperPower = await repo.getSingle(id);
        if(!foundSuperPower){
            app.errors.createException(app.errors.messages.superpower.delete.exists);            
        }
        const foundSuperHero = await superHeroService.getSingle(foundSuperPower.superHeroId);
        if(foundSuperHero){
            app.errors.createException(app.errors.messages.superpower.delete.hero_exists);            
        }
    }

    return {create, update, drop}
}