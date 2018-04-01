angular
  .module('myApp')
  .controller('usersController', usersController);

usersController.$inject = ['$scope', '$rootScope', '$routeParams', '$location', 'PostService'];
function usersController($scope, $rootScope, $routeParams, $location, PostService) {
  // Username
  $scope.username = $routeParams.username;

  // Type of user
  $scope.type = $rootScope.globals.currentUser.type;  

  $scope.info = `About ${$scope.username}`;

  // Initialization of commodity list
  $scope,commodityList = [];

  // Initialize chat status to false by default
  $scope.ChatStatus = false;

  // Get Details by username
  PostService.GetByUsername($scope.username)
    .then(function(user) {
      // Invalid user if any changes happens in the username then
      if(user === "username not found") {
        let toastContent = '<span class="flow-text">Invalid User</span>';  
        Materialize.toast(toastContent, 3000);
        $timeout(function() {
          $location.path('/');
        }, 3000);
      } else {
        // Personal Info
        $scope.id = user.id;
        $scope.name = user.name;
        $scope.phone = user.phone;
        $scope.email = user.email;
      }
    });

  // Getting all the post from database
  $scope.GetPostByUsername = function() {
    PostService.GetPostByUsername($scope.username)
      .then(function(post) {
        // checking if post is present or not
        if(post === "invalid") {
          let toastContent = '<span class="flow-text">No Post found</span>';  
          Materialize.toast(toastContent, 3000);
        } else {
          // Update the list
          $scope.commodityList = post;
        }
      });
  }
  // implicit call
  $scope.GetPostByUsername();

  $scope.GotoProfile = function() {
    let username = $scope.search;

    PostService.GetByUsername(username)
      .then(function(user) {
        // Invalid user if any changes happens in the username then
        if(user === "username not found") {
          let toastContent = '<span class="flow-text">Invalid User</span>';  
          Materialize.toast(toastContent, 3000);
        } else {
          // Redirect to the user's profile
          let path = `user/${username}`;
          $location.path(path);
        }
      });
  }

  $scope.toggleChat = function() {
    $scope.ChatStatus = !$scope.ChatStatus;
  }

  // Initialization of channel list
  $scope.channelMessage = [];
  
  // Initial days array
  let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];  

  // Get the timestamp
  let timenow = new Date();
  timenow = `${timenow.getDate()}-${timenow.getMonth()}-${timenow.getFullYear()} ${days[timenow.getDay()]}`;
}