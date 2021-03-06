const app = require('../../src/index');
const server = app.listen();
const request = require('supertest').agent(server);
const authHelper = require('../lib/authHelper');
const testDatabase = require('../lib/testDatabase');
const assert = require("assert")

describe('Super Hero', function () {
    after(function () {
        server.close();
    });
    const auth = {};
    const items = {user:{}};
    before(function (done) {
        testDatabase(app).clearAll()
            .then(() =>
                testDatabase(app).preCreatedUserAdmin(items)
            ).then(() =>
                testDatabase(app).preCreatedSuperPowers(items)
            ).then(() =>
                testDatabase(app).preCreatedSuperHero(items)
            ).then(() =>
                testDatabase(app).createSuperHeroesPowers(items.superHero[0].dataValues, items.SuperPowers[0].dataValues)
            ).then(() => {
                authHelper.loginUser(request, auth)(done)
            });
    })

    it('Create Super Hero', function (done) {
        request
            .post('/1.0/api/superhero')
            .set('Authorization', 'Bearer ' + auth.token)
            .send({
                name: "Bruce Wayne",
                alias: "Batman",
                protectionArea: {
                    name: "Gotham",
                    lat: "1",
                    long: "3",
                    radius: 13
                },
                superPowers: [items.SuperPowers[0].dataValues.id]
            })
            .expect(201)
            .then(response => {
                assert.deepEqual(response.status, 201);
                assert.notEqual(response.body.id, null);
                assert.deepEqual(response.body.name, 'Bruce Wayne');
                assert.deepEqual(response.body.alias, 'Batman');
                assert.notEqual(response.body.protectionAreaId, null);
                done();
            })
    });

    it('Create Superpower- missing information', function (done) {
        request
            .post('/1.0/api/superhero')
            .set('Authorization', 'Bearer ' + auth.token)
            .send({
                name: "Bruce Wayne",
                protectionArea: {
                    name: "Gotham",
                    lat: "1",
                    long: "3",
                    radius: 13
                },
                superPowers: [items.SuperPowers[0].dataValues.id]
            })
            .expect(412, done);
    });

    it('Create Superpower- missing protection area information', function (done) {
        request
            .post('/1.0/api/superhero')
            .set('Authorization', 'Bearer ' + auth.token)
            .send({
                name: "Bruce Wayne",
                alias: "Batman",
                protectionArea: {
                    name: "Gotham",
                    radius: 13
                },
                superPowers: [items.SuperPowers[0].dataValues.id]
            })
            .expect(412)
            .then(response => {
                assert.deepEqual(response.error.text, 'As seguintes informações não foram enviadas: protectionArea.lat, protectionArea.long')
                done();
            });
    });


    it('Create Superpower - already exists', function (done) {
        request
            .post('/1.0/api/superhero')
            .set('Authorization', 'Bearer ' + auth.token)
            .send({
                name: items.superHero[0].dataValues.name,
                alias: "Batman",
                protectionArea: {
                    name: "Metrocity",
                    lat: "1",
                    long: "3",
                    radius: 13
                },
                superPowers: [items.SuperPowers[0].dataValues.id]
            })
            .expect(400)
            .then(response => {
                assert.deepEqual(response.status, 400);
                assert.deepEqual(response.error.text, 'Super herói já existe.');
                done();
            })
    });

    it('Update Super Hero', function (done) {
        const itemUpdatable = items.superHero[2].dataValues;
        request
            .put('/1.0/api/superhero/' + itemUpdatable.id)
            .set('Authorization', 'Bearer ' + auth.token)
            .send({
                name: "Bruce",
                alias: "Super Batman",
                protectionArea: {
                    name: "Gotham World",
                    lat: "11",
                    long: "31",
                    radius: 131
                },
                superPowers: [items.SuperPowers[0].dataValues.id]
            })
            .expect(200)
            .then(response => {
                assert.deepEqual(response.status, 200);
                assert.notEqual(response.body.id, null);
                assert.deepEqual(response.body.name, 'Bruce');
                assert.deepEqual(response.body.alias, 'Super Batman');
                assert.notEqual(response.body.protectionAreaId, null);
                done();
            })
    });

    it('Update Super Hero missing information', function (done) {
        const itemUpdatable = items.superHero[2].dataValues;
        request
            .put('/1.0/api/superhero/' + itemUpdatable.id)
            .set('Authorization', 'Bearer ' + auth.token)
            .send({
                name: "Bruce",
                protectionArea: {
                    name: "Gotham World",
                    lat: "1",
                    long: "3",
                    radius: 13
                },
                superPowers: [items.SuperPowers[0].dataValues.id]
            })
            .expect(412)
            .then(response => {
                assert.deepEqual(response.status, 412);
                assert.deepEqual(response.error.text, 'As seguintes informações não foram enviadas: alias')
                done();
            })
    });

    it('Update Super Hero missing area information', function (done) {
        const itemUpdatable = items.superHero[2].dataValues;
        request
            .put('/1.0/api/superhero/' + itemUpdatable.id)
            .set('Authorization', 'Bearer ' + auth.token)
            .send({
                name: "Bruce",
                alias: "Bruce",
                protectionArea: {
                    name: "Gotham World",
                    radius: 13
                },
                superPowers: [items.SuperPowers[0].dataValues.id]
            })
            .expect(412)
            .then(response => {
                assert.deepEqual(response.status, 412);
                assert.deepEqual(response.error.text, 'As seguintes informações não foram enviadas: protectionArea.lat, protectionArea.long')
                done();
            })
    });


    it('Update Super Hero to one that already exists', function (done) {
        const itemUpdatable = items.superHero[2].dataValues;
        request
            .put('/1.0/api/superhero/' + itemUpdatable.id)
            .set('Authorization', 'Bearer ' + auth.token)
            .send({
                name: items.superHero[0].dataValues.name,
                alias: "Super Batman",
                protectionArea: {
                    name: "Gotham World",
                    lat: "1",
                    long: "3",
                    radius: 13
                },
                superPowers: [items.SuperPowers[0].dataValues.id]
            })
            .expect(400)
            .then(response => {
                assert.deepEqual(response.status, 400);
                assert.deepEqual(response.error.text, 'Super herói já existe.');
                done();
            })
    });

    it('Update Super Hero - not exists', function (done) {
        const itemUpdatable = items.superHero[2].dataValues;
        request
            .put('/1.0/api/superhero/-1')
            .set('Authorization', 'Bearer ' + auth.token)
            .send({
                name: items.superHero[2].dataValues.name,
                alias: "Super Batman",
                protectionArea: {
                    name: "Gotham World",
                    lat: "1",
                    long: "3",
                    radius: 13
                },
                superPowers: [items.SuperPowers[0].dataValues.id]
            })
            .expect(404)
            .then(response => {
                assert.deepEqual(response.status, 404);
                assert.deepEqual(response.error.text, 'Super herói não existe.');
                done();
            })
    });

    it('Delete Super Hero', function (done) {
        const itemDeletable = items.superHero[3].dataValues;
        request
            .delete('/1.0/api/superhero/' + itemDeletable.id)
            .set('Authorization', 'Bearer ' + auth.token)
            .expect(200, done);
    });

    it('Delete Super Hero - not exists', function (done) {
        request
            .delete('/1.0/api/superhero/-1')
            .set('Authorization', 'Bearer ' + auth.token)
            .expect(404, done);
    });

    it('Search paginated', function (done) {
        request
            .get('/1.0/api/superhero?page=1&limit=3')
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
            .get('/1.0/api/superhero?page=2&limit=2')
            .set('Authorization', 'Bearer ' + auth.token)
            .expect(200)
            .then(response => {
                assert.deepEqual(response.status, 200);
                assert.deepEqual(response.body.data.length, 2);
                assert.deepEqual(response.body.page.page, 2);
                assert.deepEqual(response.body.page.pages, 3);
                done();
            })
    });

    it('Search by id', function (done) {
        const itemSelectable = items.superHero[0].dataValues;
        request
            .get('/1.0/api/superhero/'+itemSelectable.id)
            .set('Authorization', 'Bearer ' + auth.token)
            .expect(200)
            .then(response => {
                assert.deepEqual(response.status, 200);

                response.body.SuperPowers[0].SuperHeroesPowers = undefined;
                itemSelectable.SuperPowers[0].SuperHeroesPowers = undefined;
                
                assert.deepEqual(response.body.id, itemSelectable.id);
                assert.deepEqual(response.body.name, itemSelectable.name);
                assert.deepEqual(response.body.alias, itemSelectable.alias);
                assert.deepEqual(response.body.protectionAreaId, itemSelectable.protectionAreaId);
                assert.deepEqual(response.body.ProtectionArea, itemSelectable.ProtectionArea.dataValues);
                assert.deepEqual(response.body.SuperPowers, itemSelectable.SuperPowers);
                done();
            })
    });


    it('Search by id - not found', function (done) {
        const itemSelectable = items.superHero[0].dataValues;
        request
            .get('/1.0/api/superhero/-1')
            .set('Authorization', 'Bearer ' + auth.token)
            .expect(404, done)
    });
});