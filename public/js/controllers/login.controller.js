angular
  .module('myApp')
  .controller('loginController', loginController);

loginController.$inject = ['$scope','$location', 'AuthenticationService'];
function loginController($scope, $location, AuthenticationService) {
  $scope.msg = "Welcome from Login page";

  // Reload the session
  AuthenticationService.ClearCredentials();

  $scope.login = function() {
    let username = $scope.username;
    let password = $scope.password;

    // Dummy Validation
    if(username === 'test' && password === '1234') {
      $location.path('/register');
      $scope.clearField();
    }

    // Authentication
    AuthenticationService.Login(username, password, function(response) {
      if(response.success) {
        $scope.clearField();
        $location.path('/');
      }
    });
  }

  // clearing the fields
  $scope.clearField = function() {
    $scope.username = '';
    $scope.password = '';
  }
}