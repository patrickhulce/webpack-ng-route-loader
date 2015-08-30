var fs = require('fs');
var _ = require('lodash');

var cachedResolveObjTemplate = _.template(
  fs.readFileSync(__dirname + '/resolve.tmpl.js', 'utf8')
);

var f;
module.exports = f = function (content) {
  this.cacheable(true);

  return content.replace(/require.asyncDependencies[^)]+\)/, function (line) {
    var linePartial = line.substr(line.indexOf('[') + 1);
    var depsCSV = linePartial.substr(0, linePartial.indexOf(']'));
    var deps = depsCSV.split(',').map(function (dep) {
      return dep.replace(/['"\s]+/g, '');
    });

    return cachedResolveObjTemplate({
      deps: deps,
      jsonDeps: JSON.stringify(deps)
    });
  });
};

console.log(f("require.asyncDependencies(['webpack/my-thing', 'angular/thing/sdf.js', 'asdf/asdf/fsdf.js'])"));
