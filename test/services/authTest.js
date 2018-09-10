const app = require('../../src/index');
const server = app.listen();
const request = require('supertest').agent(server);
const authHelper = require('../lib/authHelper');

describe('Koa Basic Auth', function () {
    after(function () {
        server.close();
    });

    const auth = {};
    before(authHelper.loginUser(request, auth));

    
    describe('with no credentials', function () {
        it('should `throw` 401', function (done) {
            request
                .get('/')
                .expect(401, done);
        });
    });

    describe('with invalid credentials', function () {
        it('should `throw` 401', function (done) {
            request
                .get('/')
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

});