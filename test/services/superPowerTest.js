const app = require('../../src/index');
const server = app.listen();
const request = require('supertest').agent(server);
const authHelper = require('../lib/authHelper');
const testDatabase = require('../lib/testDatabase');
const assert = require("assert")

describe('SuperPower', function () {
    after(function () {
        server.close();
    });
    const auth = {user:{}};

    let defaultItem = {
        name: 'Kamehameha',
        description: 'Onda Vital'
    };
    
    const items = {};
    before(function (done) {
        testDatabase(app).clearAll()
        .then(() =>
            testDatabase(app).preCreatedUserAdmin(auth)
        ).then(() =>
            testDatabase(app).preCreatedSuperPowers(items)
        ).then(() =>
            testDatabase(app).preCreatedSuperHero(items)
        ).then(() =>
            testDatabase(app).createSuperHeroesPowers(items.superHero[0], items.SuperPowers[0])
        ).then(() => {
            authHelper.loginUser(request, auth)(done)
        });
    })

    it('Create Superpowers', function (done) {
        request
            .post('/1.0/api/superpower')
            .set('Authorization', 'Bearer ' + auth.token)
            .send(defaultItem)
            .expect(201)
            .then(response => {
                assert.deepEqual(response.status, 201);
                assert.deepEqual(response.body.name, 'Kamehameha');
                assert.deepEqual(response.body.description, 'Onda Vital');
                done();
            })
    });

    it('Create Superpower- missing information', function (done) {
        request
            .post('/1.0/api/superpower')
            .set('Authorization', 'Bearer ' + auth.token)
            .send({
                name: 'Kamehameha'
            })
            .expect(412, done);
    });


    it('Create Superpower - already exists', function (done) {
        request
            .post('/1.0/api/superpower')
            .set('Authorization', 'Bearer ' + auth.token)
            .send({
                name: items.SuperPowers[0].name,
                description: items.SuperPowers[0].description
            })
            .expect(400)
            .then(response => {
                assert.deepEqual(response.status, 400);
                done();
            })
    });

    it('Update Superpowers', function (done) {
        const itemUpdatable = items.SuperPowers[2].dataValues;
        request
            .put('/1.0/api/superpower/'+itemUpdatable.id)
            .set('Authorization', 'Bearer ' + auth.token)
            .send({
                name: 'Final Kamehameha',
                description: 'Final Flash hameha'
            })
            .expect(200, {
                id: itemUpdatable.id, 
                name: 'Final Kamehameha',
                description: 'Final Flash hameha'
            }, done);
    });

    it('Create Superpower missing information', function (done) {
        const itemUpdatable = items.SuperPowers[2].dataValues;
        request
            .put('/1.0/api/superpower/'+itemUpdatable.id)
            .set('Authorization', 'Bearer ' + auth.token)
            .send({
                name: 'Kamehameha'
            })
            .expect(412, done);
    });

    it('Update Superpower to one that already exists', function (done) {
        const itemUpdatable = items.SuperPowers[2].dataValues;
        request
            .put('/1.0/api/superpower/'+itemUpdatable.id)
            .set('Authorization', 'Bearer ' + auth.token)
            .send({
                name: items.SuperPowers[0].name,
                description: items.SuperPowers[0].description
            })
            .expect(400)
            .then(response => {
                assert.deepEqual(response.status, 400);
                assert.deepEqual(response.error.text, 'Super poder já existe.');
                done();
            });
    });

    it('Update Superpower - not exists', function (done) {
        request
            .put('/1.0/api/superpower/-1')
            .set('Authorization', 'Bearer ' + auth.token)
            .send({
                name: 'Final Kamehameha',
                description: 'Final Flash hameha'
            })
            .expect(404)
            .then(response => {
                assert.deepEqual(response.status, 404);
                assert.deepEqual(response.error.text, 'Super poder não existe.');
                done();
            });
    });

    it('Delete Superpowers', function (done) {
        const itemDeletable = items.SuperPowers[3].dataValues;
        request
            .delete('/1.0/api/superpower/'+itemDeletable.id)
            .set('Authorization', 'Bearer ' + auth.token)
            .expect(200, done);
    });

    it('Delete Superpowers - Binded to superhero', function (done) {
        request
            .delete('/1.0/api/superpower/'+items.SuperPowers[0].dataValues.id)
            .set('Authorization', 'Bearer ' + auth.token)
            .expect(400, done);
    });


    it('Delete Superpowers - not exists', function (done) {
        request
            .delete('/1.0/api/superpower/-1')
            .set('Authorization', 'Bearer ' + auth.token)
            .expect(400, done);
    });

    it('Search paginated', function (done) {
        request
            .get('/1.0/api/superpower?page=1&limit=3')
            .set('Authorization', 'Bearer ' + auth.token)
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
            .get('/1.0/api/superpower?page=2&limit=2')
            .set('Authorization', 'Bearer ' + auth.token)
            .expect(200)
            .then(response => {
                assert.deepEqual(response.status, 200);
                assert.deepEqual(response.body.data.length, 2);
                assert.deepEqual(response.body.page.page, 2);
                assert.deepEqual(response.body.page.pages, 2);
                done();
            })
    });


    it('Search by id', function (done) {
        const itemSelectable = items.SuperPowers[0].dataValues;
        request
            .get('/1.0/api/superpower/'+itemSelectable.id)
            .set('Authorization', 'Bearer ' + auth.token)
            .expect(200)
            .then(response => {
                assert.deepEqual(response.status, 200);
                assert.deepEqual(response.body, itemSelectable);
                done();
            })
    });


    it('Search by id - not found', function (done) {
        const itemSelectable = items.superHero[0].dataValues;
        request
            .get('/1.0/api/superpower/-1')
            .set('Authorization', 'Bearer ' + auth.token)
            .expect(404, done)
    });
});