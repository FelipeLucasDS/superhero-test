/**
 * Handle every application error to error log
 * @module src/lib/middleware/errorHandler
 */
module.exports = app => {
    return (err) =>{
        app.logger(err);
    }
}