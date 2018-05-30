const huejay = require('huejay');
const configService = require('./localBridgeConnectionConfigService');

const initialize = async () => {
    try {
        const localBridgeConnectionConfig = await configService.readLocalBridgeConnectionConfigAsync();
        console.log(`Local bridge connection profile already exists.\n${JSON.stringify(localBridgeConnectionConfig)}`);
    }
    catch(error) {
        huejay.discover()
            .then((bridges) => {
                for(const bridge of bridges) {
                    const hueClient = new huejay.Client({
                        host: bridge.ip
                    });
                    const user = new hueClient.users.User;
                    hueClient.users.create(user)
                        .then(async (user) => {
                            try {
                                console.log(`Created new user named ${user.username}`);
                                const fileData = JSON.stringify({bridgeIP: bridge.ip, cliAuthenticatedUser: user.username});
                                const savedLocalBridgeConnectionConfig = await configService.writeLocalBridgeConnectionConfigAsync(fileData);
                                console.log('Local bridge connection profile saved successfully.');
                            }
                            catch(error) {
                                console.log(`Unable to save connection profile.\n${error.message}`);
                            }
                        })
                        .catch((error) => {
                            if(error instanceof huejay.Error && error.type === 101) {
                                console.log('Unable to create user. Press the link button on your Hue bridge while running the initialize command.');
                            }
                            else {
                                console.log(`Unable to create user. An error occurred on the bridge.\n${error.message}`);
                            }
                        });
                }
            })
            .catch((error) => {
                console.log(`An error occurred.\n${error.message}`);
            });
    }
};

const turnAllLightsOn = async () => {
    try {
        const localBridgeConnectionConfig = await configService.readLocalBridgeConnectionConfigAsync();
        const hueClient = new huejay.Client({
            host: localBridgeConnectionConfig.bridgeIP,
            username: localBridgeConnectionConfig.cliAuthenticatedUser
        });
        hueClient.lights.getAll()
            .then((lights) => {
                for (let light of lights) {
                    light.on = true;
                    hueClient.lights.save(light);
                }
            });

    }
    catch(error) {
        console.log('Unable to retrieve local connection profile. Please run "philips-hue-cli i" to create one.');
    }
};

const turnAllLightsOff = async () => {
    try {
        const localBridgeConnectionConfig = await configService.readLocalBridgeConnectionConfigAsync();
        const hueClient = new huejay.Client({
            host: localBridgeConnectionConfig.bridgeIP,
            username: localBridgeConnectionConfig.cliAuthenticatedUser
        });
        hueClient.lights.getAll()
            .then((lights) => {
                for (let light of lights) {
                    light.on = false;
                    hueClient.lights.save(light);
                }
            });

    }
    catch(error) {
        console.log('Unable to retrieve local connection profile. Please run "philips-hue-cli i" to create one.');
    }
};

module.exports = { initialize, turnAllLightsOn, turnAllLightsOff };