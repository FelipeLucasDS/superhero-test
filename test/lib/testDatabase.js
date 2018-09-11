module.exports = app => {
    const User = app.db.User;
    const Role = app.db.Role;
    const Audit = app.db.Audit;
    const ProtectionArea = app.db.ProtectionArea;
    const SuperHero = app.db.SuperHero;
    const SuperHeroesPowers = app.db.SuperHeroesPowers;
    const SuperPowers = app.db.SuperPower;

    const preCreatedSuperHero = async (items) => {
        await preDefinedArea(items);

        items.superHero  = await SuperHero.create({
            name: 'Saitama',
            alias: 'OnePunch',
            protectionAreaId: items.area.id
        });
    }

    const preCreatedSuperPowers = async (items) => {
        items.SuperPowers = await Promise.all([
            SuperPowers.create({
                name: 'Hadouken',
                description: 'Punho ondulante'
            }),
            SuperPowers.create({
                name: 'Punch',
                description: 'Soco'
            }),
            SuperPowers.create({
                name: 'Fire',
                description: 'Tiro'
            }),
            SuperPowers.create({
                name: 'Final flash',
                description: 'Resplendor final'
            })
        ]);
    }

    const preDefinedArea = async (items) => {
        items.area =  await ProtectionArea.create({
            name: 'Namek',
            lat: 'Farr',
            long: 'Far',
            radius: 123
        });
    }

    const createSuperHeroesPowers = async (superHeroId, superPowerId) => {
        return await SuperHeroesPowers.create({
            superHeroId,
            superPowerId
        });
    }


    const preCreatedUserAdmin = async (app) => {
        const Admin = await Role.create({
            name: 'ADMIN'
        });

        return await User.create({
            name: 'tobi',
            username: 'rama',
            password: 'sensei',
            role: Admin.id
        })
    }

    const preCreatedUserStandard = async (request) => {
        const STANDARD = await Role.create({
            name: 'STANDARD'
        });

        return await User.create({
            name: 'Obi',
            username: 'one',
            password: 'kenobi',
            role: STANDARD.id
        })
    }

    const clearAll = async () => {
        const opts = {
            where: {},
            truncate: true
        };
        await Promise.all([
            Audit.destroy(opts),
            User.destroy(opts),
            SuperHeroesPowers.destroy(opts),
        ]);
        await Promise.all([
            Role.destroy(opts),
            SuperHero.destroy(opts),
            SuperPowers.destroy(opts),
        ]);
        await Promise.all([
            ProtectionArea.destroy(opts),
        ]);
    }

    return {
        clearAll,
        preCreatedUserStandard,
        preCreatedSuperHero,
        preCreatedUserAdmin,
        preCreatedSuperPowers,
        preDefinedArea,
        createSuperHeroesPowers
    }
}