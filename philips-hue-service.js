const huejay = require('huejay');
const fileSystem = require('fs');

const LOCAL_BRIDGE_CONNECTION_PROFILE_PATH = './local-bridge-connection-config.json';

const initialize = () => {
    fileSystem.readFile(LOCAL_BRIDGE_CONNECTION_PROFILE_PATH, (error, data) => {
        if (error || !JSON.parse(data)) {
            huejay.discover()
                .then(bridges => {
                    for (let bridge of bridges) {
                        const hueClient = new huejay.Client({
                            host: bridge.ip
                        });
                        const user = new hueClient.users.User;
                        hueClient.users.create(user)
                            .then(user => {
                                console.log(`Created new user named: ${user.username}`);
                                const file =  JSON.stringify({bridgeIP: bridge.ip, cliAuthenticatedUser: user.username});
                                fileSystem.writeFile(LOCAL_BRIDGE_CONNECTION_PROFILE_PATH, file, function (error) {
                                    if (error) {
                                        console.log('There has been an error while saving your configuration data.');
                                        console.log(error.message);
                                        return;
                                    }
                                    console.log('Local bridge connection profile saved successfully.')
                                });
                            })
                            .catch(error => {
                                if (error instanceof huejay.Error && error.type === 101) {
                                    return console.log('Unable to create user. Press the link button on your Hue bridge while running the initialize command.');
                                }
                            });
                    }
                })
                .catch(error => {
                    console.log(`An error occurred: ${error.message}`);
                });
        }
        else {
            console.log('Local bridge connection profile already exists.');
        }
    });
};

const turnAllOn = () => {
    return true;
};

const turnAllOff = () => {
    return false;
};

module.exports = { initialize, turnAllOn, turnAllOff };