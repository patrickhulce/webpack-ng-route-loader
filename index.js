var fs = require('fs');
var _ = require('lodash');

var cachedResolveObjTemplate = _.template(
  fs.readFileSync(__dirname + '/resolve.tmpl.js', 'utf8')
);

module.exports = function (content) {
  this.cacheable(true);

  return content.replace(/require.asyncDependencies[^)]+\)/, function (line) {
    var linePartial = line.substr(line.indexOf('[') + 1);
    var depsCSV = linePartial.substr(0, linePartial.indexOf(']'));
    var deps = depsCSV.split(',').map(function (dep) {
      return dep.replace(/['"\s]+/g, '');
    }).filter(function (s) { return s.length > 0; });

    return cachedResolveObjTemplate({
      deps: deps,
      jsonDeps: JSON.stringify(deps)
    });
  });
};
