'use strict';

var spawn = require('child_process').spawn,
    Q = require('q');

module.exports = function(command, args, intro_msg, options) {
  var deferred = Q.defer(),
      childProcess = spawn(command, args, options),
      errorLogs = '';

  if (intro_msg) {
    process.stdout.write(intro_msg);
  }

  childProcess.stderr.on('data', function (data) {
    var msg = data.toString();
    if (msg) {
      errorLogs += msg;
    }
  });

  childProcess.on('close', function (code) {
    if (code === 0) {
      if (intro_msg) {
        deferred.resolve();
      } else {
        deferred.resolve();
      }
    } else {
      deferred.reject(errorLogs.trim());
    }
  });

  return deferred.promise;
};
