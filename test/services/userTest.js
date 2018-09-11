const app = require('../../src/index');
const server = app.listen();
const request = require('supertest').agent(server);
const authHelper = require('../lib/authHelper');
const testDatabase = require('../lib/testDatabase');
const assert = require("assert");

describe('User', function () {

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
    });
    
    after(function () {
        server.close();
    });

    it('create an ADMIN', function (done) {
        request
            .post('/1.0/api/user')
            .set('Authorization', 'Bearer ' + items.token)
            .send({
                username: "naruto",
                name: "Naruto Uzumaku",
                password: "123456",
                role: "ADMIN",
            })
            .expect(201)
            .then(response => {
                assert.deepEqual(response.status, 201);
                assert.notEqual(response.body.id, null);
                assert.deepEqual(response.body.username, "naruto");
                assert.deepEqual(response.body.name, "Naruto Uzumaku" );
                done();
            })
    });

    it('create an STANDARD', function (done) {
        request
            .post('/1.0/api/user')
            .set('Authorization', 'Bearer ' + items.token)
            .send({
                username: "Boruto",
                name: "Boruto Uzumaku",
                password: "123456",
                role: "STANDARD",
            })
            .expect(201)
            .then(response => {
                assert.deepEqual(response.status, 201);
                assert.notEqual(response.body.id, null);
                assert.deepEqual(response.body.username, "Boruto");
                assert.deepEqual(response.body.name, "Boruto Uzumaku" );
                done();
            })
    });

    it('Update', function (done) {
        request
            .put('/1.0/api/user/'+items.user.standard.dataValues.id)
            .set('Authorization', 'Bearer ' + items.token)
            .send({
                username: "Dart",
                name: "Vader",
                password: "123456",
                role: "ADMIN",
            })
            .then(response => {
                assert.deepEqual(response.status, 200);
                assert.notEqual(response.body.id, null);
                assert.deepEqual(response.body.username, "Dart");
                assert.deepEqual(response.body.name, "Vader" );
                done();
            })
    });

    it('Search by id', function (done) {
        const itemSelectable = items.user.admin.dataValues;
        request
            .get('/1.0/api/user/'+itemSelectable.id)
            .set('Authorization', 'Bearer ' + items.token)
            .expect(200)
            .then(response => {
                assert.deepEqual(response.status, 200);
                assert.deepEqual(response.body, itemSelectable);
                done();
            })
    });


    it('Search by id - not found', function (done) {
        request
            .get('/1.0/api/user/-1')
            .set('Authorization', 'Bearer ' + items.token)
            .expect(404, done)
    });

    it('Search paginated', function (done) {
        request
            .get('/1.0/api/user?page=1&limit=3')
            .set('Authorization', 'Bearer ' + items.token)
            .expect(200)
            .then(response => {
                assert.deepEqual(response.status, 200);
                assert.deepEqual(response.body.data.length, 3);
                assert.deepEqual(response.body.page.page, 1);
                assert.deepEqual(response.body.page.pages, 2);
                done();
            })
    });

    it('Search paginated less data', function (done) {
        request
            .get('/1.0/api/user?page=2&limit=2')
            .set('Authorization', 'Bearer ' + items.token)
            .expect(200)
            .then(response => {
                assert.deepEqual(response.status, 200);
                assert.deepEqual(response.body.data.length, 2);
                assert.deepEqual(response.body.page.page, 2);
                assert.deepEqual(response.body.page.pages, 2);
                done();
            })
    });

});