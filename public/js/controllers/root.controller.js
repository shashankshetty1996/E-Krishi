angular
  .module('myApp')
  .controller('rootController', rootController);

rootController.$inject = ['$scope', '$rootScope', '$interval'];
function rootController($scope, $rootScope, $interval) {
  // Login Status
  $scope.logStatus = false;
  $scope.type = '';
  $scope.username = '';

  // Constant Check of status
  $interval(function(){
    if($rootScope.globals.currentUser === undefined){
      // unauthorized user
      $scope.logStatus = false;
      $scope.type = '';      
      $scope.username = '';
    } else {
      $scope.logStatus = true;
      $scope.type = $rootScope.globals.currentUser.type;
      $scope.username = $rootScope.globals.currentUser.username;
    }
  },1000);

  // Get username
  function getUsername() {
    return $scope.username;
  }

  // Get Type of the user
  function getType() {
    return $scope.type;
  }


  // channels
  $scope.channels = [
    { name: "Market", type: "", link: "#!forum/market", isHeading: true },
    { name: "Weather", type: "", link: "#!forum/weather", isHeading: true },
    { name: "Crop Cultivation", type: "", link: "#!forum/crop", isHeading: true }
  ];
}