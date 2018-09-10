const app = require('../../src/index');
const server = app.listen();
const request = require('supertest').agent(server);

describe('Koa Basic Auth', function () {
    after(function () {
        server.close();
    });

    const auth = {};
    before(loginUser(auth));

    
    describe('with no credentials', function () {
        it('should `throw` 401', function (done) {
            request
                .get('/1.0/api/SuperPower')
                .expect(401, done);
        });
    });

    describe('with invalid credentials', function () {
        it('should `throw` 401', function (done) {
            request
                .get('/1.0/api/SuperPower')
                .auth('user', 'invalid password')
                .expect(401, done);
        });
    });

    describe('with valid credentials', function () {

        it('should call the next middleware', function (done) {
             request
                .get('/1.0/api/SuperPower')
                .set('Authorization', 'bearer ' + auth.token)
                .expect(200, done)
        });
    });


    function loginUser(auth) {
        return function(done) {
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
                return done();
            }
        };
    }
});