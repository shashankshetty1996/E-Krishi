angular
  .module('myApp')
  .controller('weatherController', weatherController)
  .filter("reverse", function() {
    return function(input) {
      input = input.split('-');  // split based in '-'
      return result = input[2] + '-' + input[1] + '-' + input[0];
    };
  });

weatherController.$inject = ['$scope', '$timeout', 'WeatherService'];
function weatherController($scope, $timeout , WeatherService) {
  $scope.msg = 'Weather Forecast';
  $scope.preloader = true;  

  WeatherService.GetAll()
    .then(function(response) {
      console.log(response);
      if(response.length !== 0) {
        $scope.zipcode = response.zip_code;
        $scope.city = response.city;
        $scope.region_name = response.region_name;
        $scope.country_name = response.country_name
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