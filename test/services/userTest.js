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
                username: "Bee",
                name: "Eight",
                password: "123456",
                role: "ADMIN",
            })
            .expect(201)
            .then(response => {
                assert.deepEqual(response.status, 201);
                assert.notEqual(response.body.id, null);
                assert.deepEqual(response.body.username, "Bee");
                assert.deepEqual(response.body.name, "Eight" );
                done();
            })
    });

    it('create - Error role', function (done) {
        request
            .post('/1.0/api/user')
            .set('Authorization', 'Bearer ' + items.token)
            .send({
                username: "qqqq",
                name: "qqqq",
                password: "qqqq",
                role: "qqqq",
            })
            .expect(404, done)
    });

    it('create - same name', function (done) {
        request
            .post('/1.0/api/user')
            .set('Authorization', 'Bearer ' + items.token)
            .send({
                username: items.user.admin.dataValues.username,
                name: "Boruto Uzumaku",
                password: "123456",
                role: "STANDARD",
            })
            .expect(400)
            .then(response => {
                assert.deepEqual(response.status, 400);
                assert.deepEqual(response.error.text, 'Usuário já existe.');
                done();
            })
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

    it('create - same name', function (done) {
        request
            .put('/1.0/api/user/'+items.user.standard.dataValues.id)
            .set('Authorization', 'Bearer ' + items.token)
            .send({
                username: items.user.admin.dataValues.username,
                name: "Boruto Uzumaku",
                password: "123456",
                role: "STANDARD",
            })
            .expect(400)
            .then(response => {
                assert.deepEqual(response.status, 400);
                assert.deepEqual(response.error.text, 'Usuário já existe.');
                done();
            })
    });

    it('Update - not found', function (done) {
        request
            .put('/1.0/api/user/-1')
            .set('Authorization', 'Bearer ' + items.token)
            .expect(404, done)
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


    it('Delete', function (done) {
        const itemDeletable = items.user.standard.dataValues;
        request
            .delete('/1.0/api/user/'+itemDeletable.id)
            .set('Authorization', 'Bearer ' + items.token)
            .expect(200, done);
    });

    it('Delete - not exists', function (done) {
        request
            .delete('/1.0/api/user/-1')
            .set('Authorization', 'Bearer ' + items.token)
            .expect(400, done);
    });

});