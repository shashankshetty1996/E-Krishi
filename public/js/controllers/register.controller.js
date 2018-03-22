angular
  .module('myApp')
  .controller('registerController', registerController);

registerController.$inject = ['$scope', 'AuthenticationService'];
function registerController($scope, AuthenticationService) {
  $scope.msg = "Welcome from Register page";

  // Reload the session
  AuthenticationService.ClearCredentials();
}