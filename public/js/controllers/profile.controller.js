angular
  .module('myApp')
  .controller('profileController', profileController);

profileController.$inject = ['$scope', '$rootScope', '$timeout', '$location', '$window', 'PostService'];
function profileController($scope, $rootScope, $timeout, $location, $window, PostService) {
  $scope.msg = "Personal Info";
  // Post form submit button value
  $scope.submitMsg = "Add Commodity";
  // username
  $scope.username = $rootScope.globals.currentUser.username;
  $scope.type = $rootScope.globals.currentUser.type;

  // display form
  $scope.display = false;
  $scope.displayMsg = "Add Post";

  // message block
  $scope.messageFlag = false;
  $scope.message = "Show Message";

  // edit item presets
  $scope.editState = false;
  $scope.editStateItem;

  $scope.commodityList =[];

  // commodity list dummy
  // $scope.commodityList = [
  //   {id: 1, name: 'rice', desc: 'I have one ton', price: 'Rs. 30/KG'},
  //   {id: 2, name: 'wheat', desc: 'I have half a ton', price: 'Rs. 25/KG'}
  // ];

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

  // Add post
  $scope.addPost = function() {
    // get details
    let username = $scope.username;
    let name = $scope.commodity;
    let description = $scope.description;
    let price = $scope.price;

    PostService.AddPost(username, name, description, price)
      .then(function(post) {
        if(post === "invalid") {
          let toastContent = '<span class="flow-text">Error in Adding post</span>';  
          Materialize.toast(toastContent, 3000);
        } else {
          let toastContent = '<span class="flow-text">Added Post successful</span>';  
          Materialize.toast(toastContent, 3000);
          
          // clearing input fields
          $scope.name = "";
          $scope.description = "";
          $scope.price = "";

          // live reload
          $scope.GetPostByUsername();
        }
      });
  }

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

  // Search the user by username
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

  // Toggle display form
  $scope.displayPost = function() {
    $scope.display = !$scope.display;

    // Toggle messages
    if($scope.display) {
      $scope.displayMsg = "Close Post";
    } else {
      $scope.displayMsg = "Add Post";
    }
  }

  // Get all the messages
  $scope.getMessage = function() {
    // To display the message block
    $scope.messageFlag = !$scope.messageFlag;
    
    // Toggle messages
    if($scope.messageFlag) {
      $scope.message = "close Message";
      PostService.GetMessageByReceiver($scope.username)
        .then(function(response) {
          if(response == "blank") {
            let toastContent = '<span class="flow-text">No Message</span>';  
            Materialize.toast(toastContent, 3000);
          } else {
            console.log(response);
            $scope.MessageList = response;
          }
        });
    } else {
      $scope.message = "show Message";
    }
  }

  $scope.ChatMsg = "You got messages";

  $scope.replyStatus = false;

  // Reply for message
  $scope.replySender = 'message';
  $scope.replyMessageTo = 'sender';
  $scope.replyMessage = function(reply) {
    // enable reply forum
    $scope.replyStatus = true;

    // Extracting the data from message
    $scope.replyMessage = reply.message;
    $scope.replyMessageTo = reply.sender;

    // focus on field
    document.replyForum.replyText.focus();
  }

  // Initial days array
  let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  // sending reply
  $scope.ChatReply = function() {
    // Getting the reply
    let reply = $scope.replyText;

    // max length
    if(reply.length >= 200) {
      let toastContent = `<span class="flow-text">Maximum 200 character</span>`;  
      Materialize.toast(toastContent, 3000);
    }

    // hiding reply forum
    $scope.replyStatus = false;

    let timenow = new Date();
    timenow = `${timenow.getDate()}-${timenow.getMonth()}-${timenow.getFullYear()} ${days[timenow.getDay()]}`;

    let data = {
      sender: $scope.username,
      receiver: $scope.replyMessageTo,
      message: reply,
      time: timenow
    };

    PostService.AddChat(data)
      .then(function(response) {
        let toastContent = `<span class="flow-text">${response}</span>`;  
        Materialize.toast(toastContent, 5000);
      });
  }

  // Edit State
  $scope.editItem = function(commodity) {
    $scope.editState = !$scope.editState;

    // not in edit mode
    if(!$scope.editState) {
      return
    }
    // Store the item
    $scope.editStateItem = commodity;
  }

  // Update post
  $scope.updatePost = function(post) {
    PostService.UpdatePost(post)
      .then(function(response) {
        if(response === "invalid") {
          let toastContent = '<span class="flow-text">Failed Updating</span>';  
          Materialize.toast(toastContent, 3000);
        } else {
          let toastContent = '<span class="flow-text">Updated Post</span>';  
          Materialize.toast(toastContent, 3000);

          // live reload          
          $scope.GetPostByUsername();

          // Change edit state
          $scope.editState = false;
        }
      });
  }

  // Delete post
  $scope.deletePost = function(id) {
    PostService.DeletePost(id)
      .then(function(response) {
        if(response === "invalid") {
          let toastContent = '<span class="flow-text">Failed Deleting Post</span>';  
          Materialize.toast(toastContent, 3000);
        } else {
          let toastContent = '<span class="flow-text">Deleted Post</span>';  
          Materialize.toast(toastContent, 3000);

          // live reload          
          $scope.GetPostByUsername();

          // Change edit state
          $scope.editState = false;
        }
      });
  }
}