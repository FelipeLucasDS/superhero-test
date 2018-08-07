const fs = require('fs');

async function readFile(path) {
    return await fs.readFileSync(path, 'utf8', function (err, data) {
        if (err) {
            return err;
        }
        return data;
    });
}

module.exports = {
    readFile,
}