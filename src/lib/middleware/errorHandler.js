
module.exports = app => {
    return (err) =>{
        app.logger(err);
    }
}