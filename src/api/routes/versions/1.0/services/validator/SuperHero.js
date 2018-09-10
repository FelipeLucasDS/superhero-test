module.exports = (app, repo) => {


    
    const create = async (superHero) => {
        const superHeroCreationNecessary = ['name', 'alias', 'protectionArea'];
        const protectionAreaCreationNecessary = ['name', 'lat', 'long', 'radius'];

        const missingInSuperHero = superHeroCreationNecessary
            .filter((key) => {
                return !Object.keys(superHero).includes(key)
            });
        
        let missingInProtectionArea = []
        if(superHero.protectionArea){
            missingInProtectionArea = protectionAreaCreationNecessary
            .filter((key) => 
                !Object.keys(superHero.protectionArea).includes(key)
            );
        }

        if(missingInSuperHero.length != 0
            || missingInSuperHero.length != 0){
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
        const superHeroUpdateNecessary = ['name', 'alias', 'protectionArea'];
        const protectionAreaUpdateNecessary = ['name', 'lat', 'long', 'radius'];

        const missingInSuperHero = superHeroUpdateNecessary
            .filter((key) => {
                return !Object.keys(superHero).includes(key)
            });
        
        let missingInProtectionArea = []
        if(superHero.protectionArea){
            missingInProtectionArea = protectionAreaUpdateNecessary
            .filter((key) => !Object.keys(superHero.protectionArea).includes(key));
        }
        

        if(missingInSuperHero.length != 0
            || missingInProtectionArea.length != 0){
            app.errors.createException(app.errors.messages.common.error.missing_information,             
                missingInSuperHero.concat(missingInProtectionArea)
                    .reduce((accum, curr) => accum + ", "+curr ));
        }

        const foundSuperHero = await repo.getByName(superHero.name);
        if(foundSuperHero && superHero.id != foundSuperHero.id){
            app.errors.createException(app.errors.messages.superhero.update.exists);            
        }
    }

    const drop = async (id) => {
        const foundSuperHero = await repo.getByName(superHero.name);
        if(!foundSuperHero){
            app.errors.createException(app.errors.messages.superhero.delete.exists);            
        }
    }

    return {create, update, drop}
}