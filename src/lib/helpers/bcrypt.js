
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = JSON.parse(fs.readFileSync('./src/config/config.json'));
config.token.secret = fs.readFileSync(config.auth.keyPath);

module.exports.encrypt = toEncrypt => {
	const salt = await bcrypt.genSalt(config.auth.saltRounds);
	return await bcrypt.hash(password, salt);
};

/**
 * Generates a JWT with the given payload.
 * @param {Object} payload JSON object representing JWT payload.
 * @returns {String} JWT in base64 format.
 */
module.exports.generateJWT = async payload => {
	return await jwt.sign(payload, config.token.secret, {
		expiresIn: config.token.expiresIn
	});
};

/**
 * Checks whether a password is genuinely valid.
 * @param {String} plainPassword Password to be checked as plain string.
 * @param {String} encodedPassword Base64 encoded password.
 * @returns {String} `true` if valid, `false` otherwise.
 */
module.exports.checkPassword = async (plainPassword, encodedPassword) => {
	return await bcrypt.compare(plainPassword, encodedPassword);
};
