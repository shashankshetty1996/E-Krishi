(function() {
  "use strict";

  angular.module("myApp").factory("WeatherService", WeatherService);

  WeatherService.$inject = ["$http", "$sce"];
  function WeatherService($http, $sce) {
    var service = {};

    service.GetAll = GetAll;
    service.GetWeatherApi = GetWeatherApi;

    return service;

    function GetAll() {
      let url = "http://freegeoip.net/json/";
      let trustedUrl = $sce.trustAsResourceUrl(url);
  
      return $http.jsonp(trustedUrl, {jsonpCallbackParam: 'callback'}).then(handleSuccess, handleError("Error getting weather conditions"));
    }

    function GetWeatherApi(latitude, longitude) {
      let apikey = "b00ee39f471d4abf9f8143323183003";
      let url = `http://api.apixu.com/v1/forecast.json?key=${apikey}&q=${latitude},${longitude}&days=10`;

      return $http.get(url).then(handleSuccess, handleError("Error getting weather conditions"));
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
