#!/usr/bin/env node

var pkg = require('../package.json');

// provide a title to the process in `ps`
process.title = pkg.name;

var commands = require('./commands');
var availableCommandNames = ['new', 'serve', 'test', 'build', '-h', '--help', '-v', '--version'];
var args = process.argv.slice(2);

function showUsage() {
  console.log('Usage: ginger <command>\n');
  console.log('Available commands:\n');
  console.log('  new <project>  Creates a new app\n');
  console.log('  serve          Serves your app\n');
  console.log('  test           Runs test suite for your app\n');
  console.log('  build          Builds your app and places it into output path (dist/ by default)\n');
  console.log('  -h, --help     shows usage information\n');
  console.log('  -v, --version  dusplays version number\n');
}

function showVersion() {
  console.log(pkg.version);
}

function showInfo() {
  var name = pkg.name[0].toUpperCase() + pkg.name.substring(1);
  console.log(name + ' command line interface. (v' + pkg.version + ')' + '\n');
}

// if no argument is supplied
if (args.length === 0) {
  showInfo();
  showUsage();
  process.exit(1);
}

var suppliedCommand = args[0].toLowerCase();

// if an invalid command is supplied
if (availableCommandNames.indexOf(suppliedCommand) === -1) {
  showInfo();
  console.error('Invalid command: ' + suppliedCommand + '\n');
  showUsage();
  process.exit(2);
}

if (suppliedCommand === '-h' || suppliedCommand === '--help') {
  showUsage();
  process.exit(0);
}

if (suppliedCommand === '-v' || suppliedCommand === '--version') {
  showVersion();
  process.exit(0);
}

// execute the supplied command with its argument(s)
var exitCode = commands[suppliedCommand].apply(null, args.slice(1));
process.exit(exitCode);
