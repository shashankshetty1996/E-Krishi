angular
  .module('myApp')
  .controller('weatherController', weatherController)
  .filter("reverse", function() {
    return function(input) {
      input = input.split('-');  // split based in '-'
      return input[2] + '-' + input[1] + '-' + input[0];
    };
  });

weatherController.$inject = ['$scope','$window', 'WeatherService'];
function weatherController($scope, $window, WeatherService) {
  $scope.msg = 'Weather Forecast';
  $scope.preloader = true; 
  
  WeatherService.GetAll()
    .then(function(response) {
      if(response.length !== 0) {
        $scope.zipcode = response.zip_code;
        $scope.latitude = response.latitude;
        $scope.longitude = response.longitude;
        $scope.city = response.city;
        $scope.region_name = response.region_name;
        $scope.country_name = response.country_name;

        WeatherService.GetWeatherApi($scope.latitude, $scope.longitude)
          .then(function(response) {
            // To stop the pre loader
            $scope.preloader = false;

            // To store the details
            $scope.forecastList = response.forecast.forecastday;
          });
      } 
    });
}