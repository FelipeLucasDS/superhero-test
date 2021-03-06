/**
 * Provides Superhero Validations
 * @module src/api/routes/versions/1.0/services/validator/Superhero
 */
module.exports = (app, repo) => {

    const superHeroNecessary = ['name', 'alias', 'protectionArea', 'superPowers'];
    const protectionAreaNecessary = ['name', 'lat', 'long', 'radius'];
    
    const create = async (superHero) => {
        const missingInSuperHero = superHeroNecessary
            .filter((key) => {
                return !Object.keys(superHero).includes(key)
            });
        
        let missingInProtectionArea = []
        if(superHero.protectionArea){
            missingInProtectionArea = protectionAreaNecessary
            .filter((key) => !Object.keys(superHero.protectionArea).includes(key))
            .map(key => "protectionArea."+key);

            missingInProtectionArea.forEach(pa => pa = "protectionArea."+pa);
        }

        if(missingInSuperHero.length != 0
            || missingInProtectionArea.length != 0){
            app.errors.createException(app.errors.messages.common.error.missing_information,             
                missingInSuperHero.concat(missingInProtectionArea)
                    .reduce((accum, curr) => accum + ", "+curr ));
        }
        const foundSuperHero = await repo.getByName(superHero.name);
        if(foundSuperHero){
            app.errors.createException(app.errors.messages.superhero.create.exists);            
        }
    }

    const update = async (superHero) => {

        const foundSuperHeroId = await repo.getSingle(superHero.id);

        if(!foundSuperHeroId){
            app.errors.createException(app.errors.messages.superhero.update.not_exists);            
        }

        const superHeroUpdateNecessary = ['name', 'alias'];

        const missingInSuperHero = superHeroUpdateNecessary
            .filter((key) => {
                return !Object.keys(superHero).includes(key)
            });
        
        let missingInProtectionArea = []
        if(superHero.protectionArea){
            missingInProtectionArea = protectionAreaNecessary
            .filter((key) => !Object.keys(superHero.protectionArea).includes(key))
            .map(key => "protectionArea."+key);
        }
        

        if(missingInSuperHero.length != 0
            || missingInProtectionArea.length != 0){
            app.errors.createException(app.errors.messages.common.error.missing_information,             
                missingInSuperHero.concat(missingInProtectionArea)
                    .reduce((accum, curr) => accum + ", "+curr ));
        }

        const foundSuperHeroName = await repo.getByName(superHero.name);

        if(foundSuperHeroName && superHero.id != foundSuperHeroName.dataValues.id){
            app.errors.createException(app.errors.messages.superhero.update.exists);            
        }
    }

    const drop = async (id) => {
        const foundSuperHero = await repo.getSingle(id);
        if(!foundSuperHero){
            app.errors.createException(app.errors.messages.superhero.delete.exists);            
        }
    }

    return {create, update, drop}
}