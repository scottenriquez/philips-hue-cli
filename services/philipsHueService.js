const huejay = require('huejay');
const localConnectionConfigService = require('./localConnectionConfigService');

const initialize = () => {
    const successCallback = () => {
        console.log('Local bridge connection profile already exists.');
    };
    const failCallback = () => {
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
                            const fileData =  JSON.stringify({bridgeIP: bridge.ip, cliAuthenticatedUser: user.username});
                            localConnectionConfigService.writeLocalConnectionConfig(fileData);
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
    };
    localConnectionConfigService.readLocalConnectionConfigSync(successCallback, failCallback);
};

const turnAllOn = () => {
    const successCallback = (localConnectionConfig) => {
        const hueClient = new huejay.Client({
            host: localConnectionConfig.bridgeIP,
            username: localConnectionConfig.cliAuthenticatedUser
        });
        hueClient.lights.getAll()
            .then(lights => {
                for (let light of lights) {
                    light.on = true;
                    hueClient.lights.save(light);
                }
            });
    };
    const failCallback = () => {
        console.log('Unable to retrieve local connection profile. Please run "philips-hue-cli i" to create one.');
    };
    localConnectionConfigService.readLocalConnectionConfigSync(successCallback, failCallback);
};

const turnAllOff = () => {
    const successCallback = (localConnectionConfig) => {
        const hueClient = new huejay.Client({
            host: localConnectionConfig.bridgeIP,
            username: localConnectionConfig.cliAuthenticatedUser
        });
        hueClient.lights.getAll()
            .then(lights => {
                for (let light of lights) {
                    light.on = false;
                    hueClient.lights.save(light);
                }
            });
    };
    const failCallback = () => {
        console.log('Unable to retrieve local connection profile. Please run "philips-hue-cli i" to create one.');
    };
    localConnectionConfigService.readLocalConnectionConfigSync(successCallback, failCallback);
};

module.exports = { initialize, turnAllOn, turnAllOff };