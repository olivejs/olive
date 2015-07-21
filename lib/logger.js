var chalk = require('chalk');

function wrap(args, color) {
  if (color) {
    args[0] = '%s' + args[0] + '%s';
    args.splice(1, 0, chalk.styles[color].open);
    args.push(chalk.styles[color].close);
  }
  return args;
}

/**
 * Wrapper around original console.log method
 */
exports.log = function() {
  // Disable logging for test environment
  if ('test' === process.env.NODE_ENV) {
    return;
  }

  var args = Array.prototype.slice.call(arguments);
  return console.error.apply(null, wrap(args));
};

/**
 * Wrapper around original console.error method
 */
exports.error = function() {
  // Disable logging for test environment
  if ('test' === process.env.NODE_ENV) {
    return;
  }

  var args = Array.prototype.slice.call(arguments);
  return console.error.apply(null, wrap(args, 'red'));
};
