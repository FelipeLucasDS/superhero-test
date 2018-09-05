
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = JSON.parse(fs.readFileSync('./src/config/config.json'));
config.token.secret = fs.readFileSync(config.auth.keyPath);

module.exports.encrypt = toEncrypt => {
	const salt = bcrypt.genSalt(config.auth.saltRounds);
	return bcrypt.hash(password, salt);
};

/**
 * Generates a JWT with the given payload.
 * @param {Object} payload JSON object representing JWT payload.
 * @returns {String} JWT in base64 format.
 */
module.exports.generateJWT = payload => {
	return jwt.sign(payload, config.token.secret, {
		expiresIn: config.token.expiresIn
	});
};

/**
 * Checks whether a password is genuinely valid.
 * @param {String} plainPassword Password to be checked as plain string.
 * @param {String} encodedPassword Base64 encoded password.
 * @returns {String} `true` if valid, `false` otherwise.
 */
module.exports.checkPassword = (plainPassword, encodedPassword) => {
	return bcrypt.compare(plainPassword, encodedPassword);
};
