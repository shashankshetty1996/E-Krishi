(function() {
  "use strict";

  angular.module("myApp").factory("PostService", PostService);

  PostService.$inject = ["$http"];
  function PostService($http) {
    var service = {};

    service.GetByUsername = GetByUsername;
    service.GetPostByUsername = GetPostByUsername;
    service.AddPost = AddPost;
    service.UpdatePost = UpdatePost;
    service.DeletePost = DeletePost;
    service.GetChat = GetChat;
    service.AddChat = AddChat;

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

    function UpdatePost(post) {
      return $http.put('/users/post/' + post.id, post).then(handleSuccess, handleError('Error updating post'));
    }

    function DeletePost(id) {
      return $http.delete('/users/post/' + id).then(handleSuccess, handleError('Error deleting post'));
    }

    function GetChat(sender, receiver) {
      let url = `/chat/sender=${sender}&receiver=${receiver}`;
      console.log(url);
      return $http.get(url).then(handleSuccess, handleError('Error Getting chat'));
    }

    function AddChat(data) {
      return $http.post('/chat/', data).then(handleSuccess, handleError('Error Adding chat message'));
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
