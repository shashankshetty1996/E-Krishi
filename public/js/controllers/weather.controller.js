angular
  .module('myApp')
  .controller('weatherController', weatherController);

weatherController.$inject = ['$scope', '$timeout', 'WeatherService'];
function weatherController($scope, $timeout , WeatherService) {
  $scope.msg = 'Weather Forecast';
  $scope.preloader = true;  

  WeatherService.GetAll()
    .then(function(response) {
      console.log(response);
      if(response.length !== 0) {
        $scope.zipcode = response.zip_code;
      } 
    });

  $timeout(function() {
    WeatherService.GetWeather($scope.zipcode)
      .then(function(response) {
        // To stop the pre loader
        $scope.preloader = false;
        console.log(response);

        // To store the details
        $scope.forecasts = response.forecast;
      });
  }, 3000);
}