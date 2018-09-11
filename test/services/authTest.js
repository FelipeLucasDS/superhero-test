const app = require('../../src/index');
const server = app.listen();
const request = require('supertest').agent(server);
const authHelper = require('../lib/authHelper');
const testDatabase = require('../lib/testDatabase');
const should = require('chai').should();

describe('Koa Basic Auth', function () {
    after(function () {
        server.close();
    });

    before(function (done) {
        testDatabase(app).clearAll()
            .then(() =>
                testDatabase(app).preCreatedUserAdmin(app)
            ).then(() => {
                authHelper.loginUser(request, auth)(done)
            });
    })

    const auth = {};

    it('with no credentials should `throw` 401', function (done) {
        request
            .get('/1.0/api/SuperPower')
            .expect(401, done);
    });

    it('with invalid credentials should `throw` 401', function (done) {
        request
            .post('/public/1.0/api/auth/login')
            .send({
                username: '111',
                password: '222'
            })
            .expect(401, done);
    });

    it('with valid credentials should call the next middleware', function (done) {
        request
            .post('/public/1.0/api/auth/login')
            .send({
                username: 'rama',
                password: 'sensei'
            })
            .expect(200)
            .end((err, res) => {
                auth.token = res.body.token;
                should.exist(auth.token);
                done();
            });
    });

});