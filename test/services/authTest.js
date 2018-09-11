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

    const items = {user:{}};

    before(function (done) {
        testDatabase(app).clearAll()
            .then(() =>
                testDatabase(app).preCreatedUserAdmin(items)
            ).then(() =>
                testDatabase(app).preCreatedUserStandard(items)
            ).then(() => {
                authHelper.loginUser(request, items)(done)
            });
    })



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

    it('Login an ADMIN', function (done) {
        request
            .post('/public/1.0/api/auth/login')
            .send({
                username: 'rama',
                password: 'sensei'
            })
            .expect(200)
            .end((err, res) => {
                items.token = res.body.token;
                should.exist(items.token);
                done();
            });
    });

    it('Login an Standard', function (done) {
        request
            .post('/public/1.0/api/auth/login')
            .send({
                username: 'one',
                password: 'kenobi'
            })
            .expect(200)
            .end((err, res) => {
                should.exist(res.body.token);
                done();
            });
    });

});