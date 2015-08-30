{
  deps: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
    var deferred = $q.defer();
    require.ensure(<%= jsonDeps %>, function () {
      <% _.forEach(deps, function (dep) { %>
      $ocLazyLoad.load({name: require('<%= dep %>').name});
      <% }) %>
      deferred.resolve();
    });
    return deferred.promise;
  }]
}
