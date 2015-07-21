var fs = require('extfs');
var path = require('path');
var Q = require('q');
var https = require('https');
var logger = require('../logger');
var cmd = require('../cmd');

var DEFAULT_PROJECT_NAME = 'myapp';

var options = {};

/**
 * Checks whether a seed exists
 * @param  {String}  seed Name of the seed
 * @return {Promise}
 */
function validateSeed() {
  return Q.Promise(function(resolve, reject) {
    https.get('https://github.com/gingerjs/seed-' + options.seed, function(res) {
      if (res.statusCode === 200) {
        resolve('>> seed exists');
      } else {
        reject(new Error('Invalid seed: ' + options.seed));
      }
    }).on('error', function(err) {
      logger.error('\n  %s\n', err.message);
      reject(err);
    });
  });
}

function isDirEmpty() {
  return Q.Promise(function(resolve, reject) {
    if (fs.isEmptySync(process.cwd())) {
      resolve();
    } else {
      reject(new Error('Directory is not empty'));
    }
  });
}

/**
 * Clone seed repo and delete .git directory
 * @return Promise
 */
function cloneSeed() {
  return Q.Promise(function(resolve, reject) {
    var repo = 'https://github.com/gingerjs/seed-' + options.seed + '.git';
    var cwd = process.cwd();
    cmd('git', ['clone', repo, cwd])
      .then(function() {
        fs.removeSync(path.join(cwd, '.git'));
        resolve();
      })
      .fail(function(err) {
        reject(err);
      });
  });
}

module.exports = function(seed, project) {
  options.seed = seed;

  // if no project name is supplied, use default name
  options.project = !project ? DEFAULT_PROJECT_NAME : project;

  var promise = isDirEmpty()
    .then(validateSeed)
    .then(cloneSeed);

  promise.fail(function(err) {
    var errMsg;
    if (err instanceof Error) {
      errMsg = err.message;
    } else {
      errMsg = err;
    }
    logger.error('\n  %s\n', errMsg);
  });

  return promise;
};
