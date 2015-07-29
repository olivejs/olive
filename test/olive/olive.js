var fs = require('extfs');
var path = require('path');
var chai = require('chai');
var expect = chai.expect;

describe('require(olive)', function() {

  var olive;

  var cwd = process.cwd();
  var sandboxDir = path.join(cwd, '.sandbox');

  beforeEach(function() {
    // delete sandbox directory if already exists
    if (fs.existsSync(sandboxDir)) {
      fs.removeSync(sandboxDir);
    }
    fs.mkdirSync(sandboxDir);   // create sandbox directory
    process.chdir(sandboxDir);  // cd into sandbox directory

    olive = require('../../lib/olive');
  });

  afterEach(function() {
    process.chdir(cwd);         // restore original working directory
    fs.removeSync(sandboxDir);  // delete sandbox directory
  });

  it('returns an object', function() {
    expect(olive).to.be.an('object');
  });

  it('has getOptions() method', function() {
    expect(olive).to.have.a.property('getOptions').that.is.a('function');
  });

  it('getOptions() returns an object with default paths property', function() {
    var options = olive.getOptions();
    expect(options).to.be.an('object').that.has.a.property('paths').that.is.an('object');
  });

  describe('when working directory has a .oliverc file', function() {

    beforeEach(function() {
      // copy the .oliverc file to sandbox directory
      fs.writeFileSync(path.join(cwd, '.sandbox', '.oliverc'), fs.readFileSync(path.join(__dirname, '.oliverc')));
    });

    it('getOptions() returns an object with overriden path propertes', function() {
      var options = olive.getOptions();
      expect(options).to.be.an('object').that.has.a.property('paths').that.is.an('object');

      var paths = options.paths;

      expect(paths).to.have.a.property('src', 'src');
      expect(paths).to.have.a.property('tmp', '.tmp');
      expect(paths).to.have.a.property('dist', 'new-dist');
    });

  });

});
