var fs = require('fs');
var path = require('path');

// export all commands from `commands` directory
fs.readdirSync(__dirname).forEach(function(file) {
  var command_name = file.substring(0, file.lastIndexOf('.'));
  if (command_name !== 'index') {
    var command = require(path.join(__dirname, command_name));
    exports[command_name] = command;
  }
});
