var fs = require('fs');
var path = require('path');
var _ = require('lodash');

exports.getOptions = function() {
  var options = JSON.parse(fs.readFileSync(path.join(__dirname, 'default.oliverc')));
  var userOptions = {};

  try {
    userOptions = JSON.parse(fs.readFileSync(path.join(process.cwd(), '.oliverc')));
  } catch(err) {
    // Do nothing
  }

  // merge default options (default.oliverc) and user provided options (.oliverc)
  _.merge(options, userOptions);

  return options;
};
