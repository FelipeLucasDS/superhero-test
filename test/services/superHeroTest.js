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
    const items = {};
    before(function (done) {
        testDatabase(app).clearAll()
            .then(() =>
                testDatabase(app).preCreatedUserAdmin(app)
            ).then(() =>
                testDatabase(app).preCreatedSuperPowers(items)
            ).then(() =>
                testDatabase(app).preCreatedSuperHero(items)
            ).then(() =>
                testDatabase(app).createSuperHeroesPowers(items.superHero[0].dataValues.id, items.SuperPowers[0].dataValues.id)
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
                    name:"Gotham",
                    lat: "1",
                    long: "3",
                    radius: 13
                },
                superPowers: [items.SuperPowers[0].dataValues.id]
            })
            .expect(201)
            .then(response => {
                assert(response.status, 201);
                assert.notEqual(response.body.id, null);
                assert(response.body.name, 'Bruce Wayne');
                assert(response.body.alias, 'Batman');
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
                    name:"Gotham",
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
                    name:"Gotham",
                    radius: 13
                },
                superPowers: [items.SuperPowers[0].dataValues.id]
            })
            .expect(412)
            .then(response => {
                assert(response.error.text, 'As seguintes informações não foram enviadas: protectionArea.lat, protectionArea.long')
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
                    name:"Metrocity",
                    lat: "1",
                    long: "3",
                    radius: 13
                },
                superPowers: [items.SuperPowers[0].dataValues.id]
            })
            .expect(400)
            .then(response => {
                assert(response.status, 400);;
                assert(response.error, 'Super herói já existe.');
                done();
            })
    });

/*    it('Update Super Hero', function (done) {
        const itemUpdatable = items.SuperPowers[2].dataValues;
        request
            .put('/1.0/api/superhero/' + itemUpdatable.id)
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
            .put('/1.0/api/superhero/' + itemUpdatable.id)
            .set('Authorization', 'Bearer ' + auth.token)
            .send({
                name: 'Kamehameha'
            })
            .expect(412, done);
    });

    it('Update Superpower to one that already exists', function (done) {
        const itemUpdatable = items.SuperPowers[2].dataValues;
        request
            .put('/1.0/api/superhero/' + itemUpdatable.id)
            .set('Authorization', 'Bearer ' + auth.token)
            .send({
                name: items.SuperPowers[0].name,
                description: items.SuperPowers[0].description
            })
            .expect(400, done);
    });

    it('Update Superpower  - not exists', function (done) {
        request
            .put('/1.0/api/superhero/-1')
            .set('Authorization', 'Bearer ' + auth.token)
            .send({
                name: 'Final Kamehameha',
                description: 'Final Flash hameha'
            })
            .expect(400, done);
    });

    it('Delete Super Hero', function (done) {
        const itemDeletable = items.SuperPowers[3].dataValues;
        request
            .delete('/1.0/api/superhero/' + itemDeletable.id)
            .set('Authorization', 'Bearer ' + auth.token)
            .expect(200, done);
    });

    it('Delete Super Hero - Binded to superhero', function (done) {
        request
            .delete('/1.0/api/superhero/' + items.SuperPowers[0].dataValues.id)
            .set('Authorization', 'Bearer ' + auth.token)
            .expect(400, done);
    });


    it('Delete Super Hero - not exists', function (done) {
        request
            .delete('/1.0/api/superhero/-1')
            .set('Authorization', 'Bearer ' + auth.token)
            .expect(400, done);
    });

    it('Search paginated', function (done) {
        request
            .get('/1.0/api/superhero?page=1&limit=3')
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
            .get('/1.0/api/superhero?page=2&limit=2')
            .set('Authorization', 'Bearer ' + auth.token)
            .expect(200)
            .then(response => {
                assert(response.status, 200);
                assert(response.body.data.length, 2);
                assert(response.body.page.page, 2);
                assert(response.body.page.pages, 3);
                done();
            })
    });
 */});