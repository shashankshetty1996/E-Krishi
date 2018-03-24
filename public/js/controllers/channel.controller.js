angular
  .module('myApp')
  .controller('channelController', channelController);

channelController.$inject = ['$scope', '$routeParams'];
function channelController($scope, $routeParams) {
  let channel = $routeParams.channel;
  $scope.info = "Welcome from "+channel;
}