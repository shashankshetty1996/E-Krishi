angular.module("myApp").controller("newsController", newsController);

newsController.$inject = ["$scope", '$timeout', "NewsService"];
function newsController($scope, $timeout, NewsService) {
  $scope.msg = "Get Updated with what's actually happening!";
  $scope.loader = "Collecting Information"
  $scope.preloader = true;  

  $timeout(function() {
    $scope.preloader = false;      
  }, 3000);

  NewsService.GetAll()
    .then(function(response) {
      console.log(response);
      $scope.news = response
    });
}