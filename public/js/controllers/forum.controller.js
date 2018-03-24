angular
  .module('myApp')
  .controller('forumController', forumController);

forumController.$inject = ['$scope'];
function forumController($scope) {
  $scope.msg = "Welcome from forum section";
}