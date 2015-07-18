var chai = require('chai');
var expect = chai.expect;

describe('commands/new', function() {

  it('should return 1 if the number of arguments is not 2', function() {
    var command = require('../../lib/commands/new.js');
    var retval_noarg = command();
    var retval_onearg = command('arg1');
    var retval_threearg = command('arg1', 'arg2', 'arg3');
    var expected = 1;

    expect(retval_noarg).to.be.equal(expected);
    expect(retval_onearg).to.be.equal(expected);
    expect(retval_threearg).to.be.equal(expected);
  });

});
