module.exports = (app, repo) => {

    const userNecessary = ['name', 'username', 'password', 'role'];
    
    const create = async (user) => {
        const missingInUser = userNecessary
            .filter((key) => {
                return !Object.keys(user).includes(key)
            });
        
        if(missingInUser.length != 0){
            app.errors.createException(app.errors.messages.common.error.missing_information,             
                missingInUser
                    .reduce((accum, curr) => accum + ", "+curr ));
        }
        const foundUser = await repo.getByName(user.username);

        if(foundUser){
            app.errors.createException(app.errors.messages.user.create.exists);            
        }
    }

    const update = async (user) => {

        const foundSuperPower = await repo.getSingle(user.id);

        if(!foundSuperPower){
            app.errors.createException(app.errors.messages.user.update.not_exists);            
        }

        const missingInUser = userNecessary
            .filter((key) => {
                return !Object.keys(user).includes(key)
            });
                
        if(missingInUser.length != 0){
            app.errors.createException(app.errors.messages.common.error.missing_information,             
                missingInUser
                    .reduce((accum, curr) => accum + ", "+curr ));
        }
        const foundUser = await repo.getByName(user.username);

        if(foundUser && user.id != foundUser.dataValues.id){
            app.errors.createException(app.errors.messages.user.update.exists);            
        }
    }

    const drop = async (id) => {
        const foundUser = await repo.getSingle(id)
        if(!foundUser){
            app.errors.createException(app.errors.messages.user.delete.not_exists);            
        }
    }

    return {create, update, drop}
}