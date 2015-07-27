var fs = require('fs');
var path = require('path');
var _ = require('lodash');

exports.getOptions = function() {
  var options = JSON.parse(fs.readFileSync(path.join(__dirname, 'default.gingerrc')));
  var userOptions = {};

  try {
    userOptions = JSON.parse(fs.readFileSync(path.join(process.cwd(), '.gingerrc')));
  } catch(err) {
    // Do nothing
  }

  // merge default options (default.gingerrc) and user provided options (.gingerrc)
  _.merge(options, userOptions);

  return options;
};
