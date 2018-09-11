function loginUser(request, auth) {
    return (done) => {
        request
            .post('/public/1.0/api/auth/login')
            .send({
                username: 'rama',
                password: 'sensei'
            })
            .expect(200)
            .end((err, res) => {
                auth.token = res.body.token;
            });

        function onResponse(err, res) {
            auth.token = res.body.token;
        }
    };
}

async function createUserAdmin(app) {
    const User = app.db.User;
    const Role = app.db.Role;
    const Admin = await Role.create({
        name: 'ADMIN'
    });

    const userss = await User.create({
        name: 'tobi',
        username: 'rama',
        password: 'sensei',
        role: Admin.id
    })
}

async function createUserStandard(request) {

    const User = app.db.User;
    const Role = app.db.Role;
    const STANDARD = await Role.create({
        name: 'STANDARD'
    });

    const userss = await User.create({
        name: 'Obi',
        username: 'one',
        password: 'kenobi',
        role: STANDARD.id
    })
}

module.exports = {
    loginUser,
    createUserAdmin
}