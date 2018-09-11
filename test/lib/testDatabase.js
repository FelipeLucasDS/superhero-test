module.exports = app =>{
    const clearAll = async () => {
        const User = app.db.User;
        const Role = app.db.Role;
        await Promise.all([
            User.destroy({
                where: {},
                truncate: true
            }),
            Role.destroy({
                where: {},
                truncate: true
            })
        ]);
    }

return {clearAll}
}