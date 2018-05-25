#!/usr/bin/env node

const program = require('commander');
const service = require('./philips-hue-service');

program
    .version('0.0.1')
    .description('Philips Hue CLI');

program
    .command('init')
    .alias('i')
    .description('Initialize connection')
    .action(() => {
        service.initialize();
    });

program
    .command('on')
    .alias('n')
    .description('Turn on all lights')
    .action(() => {
        service.turnAllOn();
    });

program
    .command('off')
    .alias('f')
    .description('Turn off all lights')
    .action(() => {
        service.turnAllOff();
    });

program.parse(process.argv);