const messages = require('./message.json');

/**
 * HTTP module provides common functions for a standard HTTP server.
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
