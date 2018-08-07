var crypto = require('crypto');
const firebaseFactory = require("../utils/firebaseFacotory");

//FIXME no salt
function crypt(data) {
    return crypto.createHash('sha256').update(data).digest('base64');
}

async function authenticated(req, res, next) {
    if(!req.get("access_token")){
        res.status(401).send("UNAUTHORIZED");
        return;
    }

    await firebaseFactory.getFirebaseAdmin().auth().verifyIdToken(req.get("access_token"))
        .then(async function (decodedToken) {
            const uid = decodedToken.uid;
            req.userKey = uid;
            return await next();
        }).catch(function (error) {
            console.log('Err   1' + error)
            res.status(401).send("UNAUTHORIZED");            
        });
}

module.exports = {
    crypt,
    authenticated
}