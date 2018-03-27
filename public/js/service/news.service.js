(function() {
  "use strict";

  angular.module("myApp").factory("NewsService", NewsService);

  NewsService.$inject = ["$http"];
  function NewsService($http) {
    var service = {};

    service.GetAll = GetAll;

    return service;

    function GetAll() {
      return $http.get("/news").then(handleSuccess, handleError("Error getting all news"));
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
