#!/usr/bin/env node

const commandLineInterface = require('commander');
const hueService = require('./services/philipsHueService');

commandLineInterface
    .version('0.0.1')
    .description('Philips Hue CLI');

commandLineInterface
    .command('init')
    .alias('i')
    .description('Initialize connection')
    .action(() => {
        hueService.initialize();
    });

commandLineInterface
    .command('on')
    .alias('n')
    .description('Turn on all lights')
    .action(() => {
        hueService.turnAllLightsOn();
    });

commandLineInterface
    .command('off')
    .alias('f')
    .description('Turn off all lights')
    .action(() => {
        hueService.turnAllLightsOff();
    });

commandLineInterface.parse(process.argv);