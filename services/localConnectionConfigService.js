const fileSystem = require('fs');
const LOCAL_BRIDGE_CONNECTION_PROFILE_PATH = './local-bridge-connection-config.json';

const readLocalConnectionConfigSync = (successCallback, failCallback) => {
    fileSystem.readFile(LOCAL_BRIDGE_CONNECTION_PROFILE_PATH, (error, data) => {
        if (error || !JSON.parse(data)) {
            failCallback();
        }
        else {
            successCallback(JSON.parse(data));
        }
    });
};

const writeLocalConnectionConfig = (fileData) => {
    fileSystem.writeFile(LOCAL_BRIDGE_CONNECTION_PROFILE_PATH, fileData, function (error) {
        if (error) {
            console.log('There has been an error while saving your configuration data.');
            console.log(error.message);
            return;
        }
        console.log('Local bridge connection profile saved successfully.')
    });
};

module.exports = { readLocalConnectionConfigSync, writeLocalConnectionConfig };