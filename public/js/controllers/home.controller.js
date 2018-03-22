angular
  .module('myApp')
  .controller('homeController', homeController);

homeController.$inject = ['$scope'];
function homeController($scope) {
  $scope.msg = "Welcome from Home page";
}