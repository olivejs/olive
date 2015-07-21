#!/usr/bin/env node

var pkg = require('../package.json');

// provide a title to the process in `ps`
process.title = pkg.name;

var program = require('commander');
var logger = require('./logger');
var availableCommands = ['new', 'serve', 'test', 'build', '-h', '--help', '-v', '--version'];

program
  .version(pkg.version);

program
  .command('new <seed> [project]')
  .description('Create new project from a seed')
  .action(require('./actions/new'));

program.parse(process.argv);

var args = process.argv.slice(2);

// Display help and exit(1) if no command was provided
if (!args.length) {
  program.outputHelp();
  process.exit(101);
}

var command = args[0].toLowerCase();

// If an invalid command is supplied
if (availableCommands.indexOf(command) === -1) {
  logger.error('\n  The specific command `%s` is invalid. For available commands, see `%s --help`.\n', command, pkg.name);
  process.exit(102);
}
