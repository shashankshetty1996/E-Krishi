angular
  .module('myApp')
  .controller('profileController', profileController);

profileController.$inject = ['$scope', '$rootScope', '$timeout', '$location', 'PostService'];
function profileController($scope, $rootScope, $timeout, $location, PostService) {
  $scope.msg = "Personal Info";
  // Post form submit button value
  $scope.submitMsg = "Add Commodity";
  // username
  $scope.username = $rootScope.globals.currentUser.username;

  // display form
  $scope.display = false;
  $scope.displayMsg = "Add Post"

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
          // console.log(post);
          // $scope.commodityList.push(post);
        }
      });
  }

  // Getting all the post from database
  PostService.GetPostByUsername($scope.username)
    .then(function(post) {
      // checking if post is present or not
      if(post === "invalid") {
        let toastContent = '<span class="flow-text">No Post found</span>';  
        Materialize.toast(toastContent, 3000);
      } else {
        $scope.commodityList = post;
      }
    });

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
}