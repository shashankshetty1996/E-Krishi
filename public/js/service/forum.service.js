(function() {
  "use strict";

  angular.module("myApp").factory("ForumService", ForumService);

  ForumService.$inject = ["$http"];
  function ForumService($http) {
    var service = {};

    service.GetAllByChannel = GetAllByChannel;
    service.AddMessage = AddMessage;

    return service;

    function GetAllByChannel(channel) {
      return $http.get(`/channel/${channel}`).then(handleSuccess, handleError("Error getting all details"));
    }

    function AddMessage(data) {
      return $http.post('/channel/', data).then(handleSuccess, handleError("Error in storing message"));
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
