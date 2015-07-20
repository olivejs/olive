var DEFAULT_PROJECT_NAME = 'myapp';

module.exports = function(seed, project) {
  // if no project name is supplied, use default name
  project = !project ? DEFAULT_PROJECT_NAME : project;

  console.log('seed = %s, project = %s', seed, project);
};
