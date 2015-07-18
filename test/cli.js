var path = require('path');
var pkg = require('../package.json');
var chai = require('chai');
var expect = chai.expect;

var spawnSync = require('child_process').spawnSync;
var execFileSync = require('child_process').execFileSync;

describe('cli', function() {

  it('should return 1 when no command is supplied', function() {
    var exitCode = spawnSync('node', [path.join(__dirname, '../lib/cli')]).status;
    var expected = 1;
    expect(exitCode).to.be.equal(expected);
  });

  it('should return 2 when an invalid command is supplied', function() {
    var exitCode = spawnSync('node', [path.join(__dirname, '../lib/cli'), 'invalidcommand']).status;
    var expected = 2;
    expect(exitCode).to.be.equal(expected);
  });

  it('should output version when passed -v or --version option', function() {
    var version;
    var expected = pkg.version;

    version = execFileSync('node', [path.join(__dirname, '../lib/cli'), '-v'], { encoding: 'utf8' }).trim();
    expect(version).to.be.equal(expected);

    version = execFileSync('node', [path.join(__dirname, '../lib/cli'), '--version'], { encoding: 'utf8' }).trim();
    expect(version).to.be.equal(expected);
  });

});
