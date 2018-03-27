angular
  .module('myApp')
  .controller('profileController', profileController);

profileController.$inject = ['$scope', '$rootScope'];
function profileController($scope, $rootScope) {
  // username
  $scope.username = $rootScope.globals.currentUser.username;
}