var chai = require('chai');
var expect = chai.expect;

var pkg = require('../package.json');
var path = require('path');
var spawnSync = require('child_process').spawnSync;
var execFileSync = require('child_process').execFileSync;

var cli = path.join(__dirname, '..', 'lib', 'cli.js');

describe('olive', function() {

  it('should return with exit code 101 when no command is supplied', function() {
    var exitCode = spawnSync('node', [cli]).status;
    var expected = 101;
    expect(exitCode).to.be.equal(expected);
  });

  it('should return with exit code 102 when an invalid command is supplied', function() {
    var exitCode = spawnSync('node', [cli, 'invalidcommand']).status;
    var expected = 102;
    expect(exitCode).to.be.equal(expected);
  });

  it('should output version when passed -V or --version option', function() {
    var version;
    var expected = pkg.version;

    version = execFileSync('node', [cli, '-V'], { encoding: 'utf8' }).trim();
    expect(version).to.be.equal(expected);

    version = execFileSync('node', [cli, '--version'], { encoding: 'utf8' }).trim();
    expect(version).to.be.equal(expected);
  });

});

describe('olive new', function() {

  it('should return with exit code 1 when missing seed argument', function() {
    var exitCode = spawnSync('node', [cli, 'new']).status;
    var expected = 1;
    expect(exitCode).to.be.equal(expected);
  });

});
