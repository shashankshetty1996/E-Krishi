angular
  .module('myApp')
  .controller('usersController', usersController);

usersController.$inject = ['$scope', '$rootScope', '$routeParams', '$location', 'PostService'];
function usersController($scope, $rootScope, $routeParams, $location, PostService) {
  // Can't view his own profile
  if($routeParams.username === $rootScope.globals.currentUser.username) {
    $location.path('/profile');
  }

  // Username
  $scope.username = $routeParams.username;

  $scope.info = `About ${$scope.username}`;

  // Initialize chat status to false by default
  $scope.ChatStatus = false;

  // Get Details by username
  PostService.GetByUsername($scope.username)
    .then(function(user) {
      // Invalid user if any changes happens in the username then
      if(user === "username not found") {
        let toastContent = '<span class="flow-text">Invalid User</span>';  
        Materialize.toast(toastContent, 3000);
        $location.path('/profile');
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

  // Display chat
  PostService.GetChat($rootScope.globals.currentUser.username, $routeParams.username)
    .then(function(response) {
      console.log(response);
      $scope.channelMessage = response;
    })
  
  // Initial days array
  let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];  

  // Adding Chat to database
  $scope.addChat = function() {
    // Get the timestamp
    let timenow = new Date();
    timenow = `${timenow.getDate()}-${timenow.getMonth()}-${timenow.getFullYear()} ${days[timenow.getDay()]}`;

    let data = {
      sender: $rootScope.globals.currentUser.username,
      receiver: $routeParams.username,
      message: $scope.msg,
      time: timenow
    };

    PostService.AddChat(data)
      .then(function(response) {
        let toastContent = `<span class="flow-text">${response}</span>`;  
        Materialize.toast(toastContent, 5000);
      });
  }
}