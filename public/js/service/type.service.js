(function() {
  "use strict";

  angular.module("myApp").factory("TypeService", TypeService);

  TypeService.$inject = ["$http"];
  function TypeService($http) {
    var service = {};

    service.GetAll = GetAll;

    return service;

    function GetAll() {
      return $http.get("/users/types").then(handleSuccess, handleError("Error getting all users"));
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
