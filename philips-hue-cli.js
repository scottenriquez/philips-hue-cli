#!/usr/bin/env node

const commandLine = require('commander');
const service = require('./services/philipsHueService');

commandLine
    .version('0.0.1')
    .description('Philips Hue CLI');

commandLine
    .command('init')
    .alias('i')
    .description('Initialize connection')
    .action(() => {
        service.initialize();
    });

commandLine
    .command('on')
    .alias('n')
    .description('Turn on all lights')
    .action(() => {
        service.turnAllOn();
    });

commandLine
    .command('off')
    .alias('f')
    .description('Turn off all lights')
    .action(() => {
        service.turnAllOff();
    });

commandLine.parse(process.argv);