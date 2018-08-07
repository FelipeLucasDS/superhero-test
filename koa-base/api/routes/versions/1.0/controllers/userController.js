const moment = require('moment');

const userService = require('../services/userService');
const balanceService = require('../services/balanceService');
const cashBackService = require('../services/cashBackService');
const firebaseClient = require("../utils/firebaseFacotory");
const neoGeocoderUtils = require("../utils/neoGeocoderUtils");

const textConstants = require('../utils/textConstants.json');
const constants = require('../utils/constants.json');
const dateUtils = require('../utils/dateUtils');

const uploader = require('../utils/uploader');

async function register(req, res) {
    try {
        let userKey = req.body.cpf
        let user = await userService.get(userKey).catch((e) => {});
        let photo = req.files ? req.files[0] : undefined;
        
        if(!user) {
            let address = {};
            try {
                address = await neoGeocoderUtils.retrieveAddressAndLatLongByZipcode(req.body.cep);
            } catch(err) {
            }

            if(photo){
                const bucket = 'photos/'+userKey+'/'+Date.now()
                uploader.sendUploadToGCS(photo, userKey, bucket)
                if (photo && !photo.cloudStoragePublicUrl) {
                    res.status(400).send({message:textConstants.error.upload});
                    return 
                }
            }

            let newUser = await userService.createUser({
                email: req.body.email,
                photo: photo ? photo.cloudStoragePublicUrl : null,
                name: req.body.name,
                cpf: userKey,
                dateOfBirth: req.body.date_birth,
                password: req.body.password,
                image: req.body.image,
                gender: req.body.gender,
                cellphone: req.body.cellphone,
                cep: req.body.cep,
                country: req.body.country ? req.body.country : address.country,
                city: req.body.city ? req.body.city : address.city,
                street: req.body.street ? req.body.street : address.streetName,
                neighborhood: req.body.neighborhood ? req.body.neighborhood :address.neighborhood,
                state: req.body.state ? req.body.state : address.state
            });

            newUser.dateOfBirth = dateUtils.toISOString(newUser.dateOfBirth);
            
            res.status(201).send(convertToCommonUser(newUser));
        } else {
            res.status(400).send(
                { message: textConstants.error.user.create.cpfOnSystem}
            );
        }
    } catch(err) {
        res.status(400).send({message:err});
    }
}

async function update(req, res) {
    try{

        const userKey = req.userKey;
        let photo = req.files ? req.files[0] : undefined;
            
        let user = await userService.get(userKey);
        if(!user){
            res.status(400).send({message:textConstants.error.user.cpf});
        }
        if(user) {
            let address = {};
            try {
                address = await neoGeocoderUtils.retrieveAddressAndLatLongByZipcode(req.body.cep);
            } catch(err) {
            }
        
            if(photo){
                const bucket = 'photos/'+userKey+'/'+Date.now()
                uploader.sendUploadToGCS(photo, userKey, bucket)
                if (photo && !photo.cloudStoragePublicUrl) {
                    res.status(400).send({message:textConstants.error.upload});
                    return 
                }
            }

            user.email = req.body.email,
            user.photo = photo ? photo.cloudStoragePublicUrl : null,
            user.name = req.body.name,
            user.cpf = userKey,
            user.dateOfBirth = req.body.date_birth,
            user.password = req.body.password,
            user.image = req.body.image,
            user.gender = req.body.gender,
            user.cellphone = req.body.cellphone,
            user.cep = req.body.cep,
            user.country = req.body.country ? req.body.country : address.country,
            user.city = req.body.city ? req.body.city : address.city,
            user.street = req.body.street ? req.body.street : address.streetName,
            user.neighborhood = req.body.neighborhood ? req.body.neighborhood :address.neighborhood,
            user.state = req.body.state ? req.body.state : address.state
            
            let newUser = await userService.save(null, user);
            newUser.dateOfBirth = dateUtils.toISOString(newUser.dateOfBirth);
            res.status(201).send(convertToCommonUser(newUser));
        } else {
            res.status(400).send({message:textConstants.error.user.userOnSystem});
        }
    
    } catch(err) {
        console.log(err)
        res.status(400).send({message:err});
    }
}

async function getMe(req, res) {
    const userKey = req.userKey;

    res.status(200).send(convertToCommonUser(await userService.get(userKey)));
}

async function getInfo(req, res) {
    try{
        const userKey = req.userKey;
        const user = await userService.get(userKey);
        const balance = await balanceService.get(userKey);
            
        const response = {
            image: user.image,
            name: user.name,
            balance
        };
        res.status(200).send(response);
    } catch(err) {
        res.status(400).send({message:err});
    }
}

function logout(req, res) {
    //TODO REVER
    res.set('x-new-token', token);
    req.session.destroy();

    res.status(200).send('Successfully logged out');
}

async function cashback (req, res) {
    const userKey = req.userKey;
    const value = req.body.value
    if(value < constants.cashBackMinimun){
        res.status(400).send({message:textConstants.error.cashback});        
    }
    const found = await cashBackService.requestCashBack(userKey, value)
    const response = { found }
    res.status(201).send(response);
}

const convertToCommonUser = (user) => {
    return {
        cpf: user.cpf,
        email: user.email,
        name: user.name,
        date_birth: user.dateOfBirth,
        gender: user.gender,
        cellphone: user.cellphone,
        photo: user.photo,
        referenceCode: user.referenceCode,
        cep: user.cep,
        street: user.street,
        neighborhood: user.neighborhood,
        number: user.number,
        state: user.state,
        country: user.country
    }
}

module.exports = {
    register,
    update,
    getMe,
    logout,
    cashback,
    getInfo
}