angular
  .module('myApp')
  .controller('loginController', loginController);

loginController.$inject = ['$scope', 'AuthenticationService'];
function loginController($scope, AuthenticationService) {
  $scope.msg = "Welcome from Login page";

  // Reload the session
  AuthenticationService.ClearCredentials();
}