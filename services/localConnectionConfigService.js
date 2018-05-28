const fileSystem = require('fs');
const LOCAL_BRIDGE_CONNECTION_PROFILE_PATH = './local-bridge-connection-config.json';

const readLocalConnectionConfigSync = (readSuccessCallback, readFailCallback) => {
    fileSystem.readFile(LOCAL_BRIDGE_CONNECTION_PROFILE_PATH, (error, data) => {
        if (error || !JSON.parse(data)) {
            readFailCallback();
        }
        else {
            readSuccessCallback(JSON.parse(data));
        }
    });
};

const writeLocalConnectionConfigSync = (fileData, writeSuccessCallback, writeFailCallback) => {
    fileSystem.writeFile(LOCAL_BRIDGE_CONNECTION_PROFILE_PATH, fileData, function (error) {
        if (error) {
            writeFailCallback(error);
        }
        writeSuccessCallback();
    });
};

module.exports = { readLocalConnectionConfigSync, writeLocalConnectionConfigSync };