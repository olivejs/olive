var chai = require('chai');

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

var fs = require('extfs');
var path = require('path');
var command = require('../../lib/actions/new');

describe('olive new', function() {

  var cwd = process.cwd();
  var sandboxDir = path.join(cwd, '.sandbox');

  beforeEach(function() {
    // delete sandbox directory if already exists
    if (fs.existsSync(sandboxDir)) {
      fs.removeSync(sandboxDir);
    }
    fs.mkdirSync(sandboxDir);   // create sandbox directory
    process.chdir(sandboxDir);  // cd into sandbox directory
  });

  afterEach(function() {
    process.chdir(cwd);         // restore original working directory
    fs.removeSync(sandboxDir);  // delete sandbox directory
  });

  describe('runs in a non-empty directory', function() {

    var promise;

    beforeEach(function() {
      fs.writeFileSync(path.join(sandboxDir, 'empty'), null); // create an empty file in sandbox directory
      promise = command('whatever');
    });

    it('is rejected', function() {
      return expect(promise).to.be.rejectedWith('Directory is not empty');
    });

  });

  describe('with invalid seed', function() {
    var promise;

    beforeEach(function() {
      promise = command('invalid-seed');
    });

    it('is rejected', function() {
      return expect(promise).to.be.rejectedWith('Invalid seed');
    });
  });

  describe('with valid seed', function() {
    var promise;

    beforeEach(function() {
      promise = command('angular');
    });

    it('fulfills and clones the seed repo', function() {
      //return promise.then(function() {
      return expect(promise).to.be.fulfilled.then(function() {
        var cloned = !fs.isEmptySync(sandboxDir);
        expect(cloned).to.be.equal(true);
      });
    });
  });

});
