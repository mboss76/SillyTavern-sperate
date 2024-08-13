const fs = require('fs');
const path = require('path')
const { color } = require('./util');
const visitorsConfig = new Map();

const readFileAsync = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};

const getVistorConfig = async function (username) {
    if (!visitorsConfig.has(username)) {
        try {
            const json = await readFileAsync(path.join(__dirname, '../visitor.json'));
            if (json.hasOwnProperty(username)) {
                visitorsConfig.set(username, json[username]);
            }
        } catch (error) {
            console.log(color.red('getVistorConfig init error'), error);
        }
    }

    return visitorsConfig.get(username);
};

module.exports = {
    getVistorConfig
}

