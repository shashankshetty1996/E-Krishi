angular
  .module('myApp')
  .controller('registerController', registerController);

registerController.$inject = ['$scope', '$location', 'AuthenticationService', 'UserService', 'TypeService'];
function registerController($scope, $location, AuthenticationService, UserService, TypeService) {
  $scope.typeList = [];

  // Reload the session
  AuthenticationService.ClearCredentials();

  // Load the type drop down
  TypeService.GetAll()
    .then(function(type) {
      console.log(type);
      $scope.typeList = type;
    });

  // Checking Username
  $scope.checkUsername = function() {
    let username = $scope.username;

    // If field is empty then don't continue
    if(username === undefined) {
      return false
    }

    UserService.GetByUsername(username)
      .then(function(user) {
        if(typeof user === "string" && user !== "username not found") {
          // Alert Message
          let toastContent = `<span class="flow-text">${username} username already taken</span>`;  
          Materialize.toast(toastContent, 5000);

          // Re target the input element and set error 
          $scope.username = "";
          document.register.username.focus();
          document.register.username.classList.add("invalid");
        }
      });
  }

  // Checking Password
  $scope.checkPassword = function() {
    let pass = $scope.password;
    let cpass = $scope.cpassword;

    // password field is empty
    if(pass === undefined) {
      document.register.password.focus(); 
      return     
    }

    if(pass !== cpass) {
      // Alert Message
      let toastContent = `<span class="flow-text">Password miss matched</span>`;  
      Materialize.toast(toastContent, 5000);
      document.register.password.classList.add("invalid");
      document.register.cpassword.classList.add("invalid");
    }
  }

  // on form submit
  $scope.registerSubmit = function() {
    // Collecting all the fields
    let name = $scope.name;
    let phone = $scope.phone;
    let email = $scope.email;
    let username = $scope.username;
    let password = $scope.password;
    let cpassword = $scope.cpassword;
    let type = $scope.type.id;

    if(password !== cpassword) {
      document.register.password.focus();      
    }

    // user object
    let data = {
      name: name,
      phone: phone,
      email: email,
      username: username,
      password: password,
      type: type
    };

    UserService.Create(data)
      .then(function(user) {
        if(user !== null && user === "inserted") {
          $location.path('/login');
        } else {
          // Alert Message
          let toastContent = `<span class="flow-text">Error: Creating user. Try again</span>`;  
          Materialize.toast(toastContent, 5000);
        }
      }, function(error) {
        // Alert Message
        let toastContent = `<span class="flow-text">Error: ${error.message}. Try again</span>`;  
        Materialize.toast(toastContent, 5000);
      });
  }
}