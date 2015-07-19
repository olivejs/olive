#!/usr/bin/env node

var pkg = require('../package.json');

// provide a title to the process in `ps`
process.title = pkg.name;

var program = require('commander');
var chalk = require('chalk');
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
  process.exit(1);
}

var command = args[0].toLowerCase();

// If an invalid command is supplied
if (availableCommands.indexOf(command) === -1) {
  console.error('\n  %sThe specific command `%s` is invalid. For available commands, see `%s --help`.%s\n',chalk.styles.red.open, command, pkg.name, chalk.styles.red.close);
  process.exit(2);
}
