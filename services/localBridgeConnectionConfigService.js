const fileSystem = require('fs');
const LOCAL_BRIDGE_CONNECTION_PROFILE_PATH = './local-bridge-connection-config.json';

const readLocalBridgeConnectionConfigAsync = async () => {
    return new Promise((resolve, reject) => {
        fileSystem.readFile(LOCAL_BRIDGE_CONNECTION_PROFILE_PATH, (error, data) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(JSON.parse(data));
            }
        });
    });
};

const writeLocalBridgeConnectionConfigAsync = async (fileData) => {
    return new Promise((resolve, reject) => {
        fileSystem.writeFile(LOCAL_BRIDGE_CONNECTION_PROFILE_PATH, fileData, (error) => {
            if (error) {
                reject(error);
            }
            resolve(fileData);
        });
    });
};

module.exports = { readLocalBridgeConnectionConfigAsync, writeLocalBridgeConnectionConfigAsync };