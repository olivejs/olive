function showUsage() {
  console.log('Usage: ginger new <seed-name> <project-name>\n');
}

module.exports = function() {
  var args = Array.prototype.slice.call(arguments);

  if (args.length !== 2) {
    showUsage();
    return 1;
  }

  return 0;
};
