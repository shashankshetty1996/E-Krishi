angular
  .module('myApp')
  .controller('newsDetailsController', newsDetailsController);

newsDetailsController.$inject = ['$scope', '$rootScope', '$routeParams'];
function newsDetailsController($scope, $rootScope, $routeParams) {
  // id
  $scope.id = $routeParams.id;
}