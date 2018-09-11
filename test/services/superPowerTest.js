const app = require('../../src/index');
const server = app.listen();
const request = require('supertest').agent(server);
const authHelper = require('../lib/authHelper');
const testDatabase = require('../lib/testDatabase');
const assert = require("assert")

describe('SyperPower', function () {
    after(function () {
        server.close();
    });

    before(function (done) {
        testDatabase(app).clearAll()
        .then(() =>
            testDatabase(app).preCreatedUserAdmin(app)
        ).then(() =>
            testDatabase(app).preCreatedSuperPowers(app)
        ).then(() => {
            authHelper.loginUser(request, auth)(done)
        });
    })

    const auth = {};

    it('Create Superpowers', function (done) {
        request
            .post('/1.0/api/superpower')
            .set('Authorization', 'Bearer ' + auth.token)
            .send({
                name: 'Kamehameha',
                description: 'Onda Vital'
            })
            .expect(200)
            .then(response => {
                assert(response.status, 200);
                assert(response.body.name, 'Kamehameha');
                assert(response.body.description, 'Onda Vital');
                done();
            })
    });

    it('Search paginated', function (done) {
        request
            .get('/1.0/api/superpower?page=1&limit=3')
            .set('Authorization', 'Bearer ' + auth.token)
            .expect(200)
            .then(response => {
                assert(response.status, 200);
                assert(response.body.data.length, 3);
                assert(response.body.page.page, 1);
                assert(response.body.page.pages, 2);
                done();
            })
    });

    it('Search paginated less data', function (done) {

        request
            .get('/1.0/api/superpower?page=1&limit=2')
            .set('Authorization', 'Bearer ' + auth.token)
            .expect(200)
            .then(response => {
                assert(response.status, 200);
                assert(response.body.data.length, 2);
                assert(response.body.page.page, 1);
                assert(response.body.page.pages, 3);
                done();
            })
    });


});