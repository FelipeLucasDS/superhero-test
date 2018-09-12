const messages = require('./message.json');

/**
 * Provides common functions for error handling 
 * @module lib/helpers/errorHandling
 */

module.exports.messages = messages;

module.exports.createException = (exception, extra)=>{
	let msg = exception.msg;
	if(extra){
		msg = exception.msg.replace('$info', extra);
	}
	const err = new Error();
	err.status = exception.status;
	err.msg = msg;
	throw err;

}
