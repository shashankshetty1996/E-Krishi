(function() {
  "use strict";

  angular.module("myApp").factory("PostService", PostService);

  PostService.$inject = ["$http"];
  function PostService($http) {
    var service = {};

    service.GetByUsername = GetByUsername;
    service.GetPostByUsername = GetPostByUsername;
    service.AddPost = AddPost;

    return service;

    function GetByUsername(username) {
      return $http.get('/users/username/' + username).then(handleSuccess, handleError('Error getting user by username'));
    }

    function GetPostByUsername(username) {
      return $http.get('/users/post/' + username).then(handleSuccess, handleError('Error getting post by username'));
    }

    function AddPost(username, name, description, price) {
      return $http.post('/users/post/', {username: username, name : name, description : description, price : price}).then(handleSuccess, handleError('Error getting user by username'));
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