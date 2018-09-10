const app = require('../../src/index');
const server = app.listen();
const request = require('supertest').agent(server);
const authHelper = require('../lib/authHelper');

describe('Super powers', function () {
    const auth = {};
    before(authHelper.loginUser(request, auth));

    after(function () {
        server.close();
    });

    describe('testing superpowers', function () {
        it('create superpower', function (done) {
            request
               .post('/1.0/api/SuperPower')
               .send({
                    username: 'rama',
                    password: 'sensei'
                })
               .set('Authorization', 'bearer ' + auth.token)
               .expect(200, done)
       });
        
        it('should call the next middleware', function (done) {
             request
                .get('/1.0/api/SuperPower')
                .set('Authorization', 'bearer ' + auth.token)
                .expect(200, done)
        });
    });

});