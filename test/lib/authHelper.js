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
            return done();
        });

        function onResponse(err, res) {
            auth.token = res.body.token;
            console.log('token done '+auth.token)
            return done();
        }
    };
}

module.exports = {
    loginUser
}