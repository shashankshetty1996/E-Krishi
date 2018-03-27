(function() {
  "use strict";

  angular.module("myApp").factory("WeatherService", WeatherService);

  WeatherService.$inject = ["$http", "$sce"];
  function WeatherService($http, $sce) {
    var service = {};

    service.GetAll = GetAll;
    service.GetWeather = GetWeather;

    return service;

    function GetAll() {
      let url = "http://freegeoip.net/json/";
      let trustedUrl = $sce.trustAsResourceUrl(url);
  
      return $http.jsonp(trustedUrl, {jsonpCallbackParam: 'callback'}).then(handleSuccess, handleError("Error getting weather conditions"));
    }

    function GetWeather(zip) {
      console.log(zip);
      return $http.get(`/weather/${zip}`).then(handleSuccess, handleError('Error in Getting weather'));
    }

    // private functions

    function handleSuccess(res) {
      return res.data;
    }

    function handleError(error) {
      return function() {
        return { success: false, message: error };
      };
    }
  }
})();
