angular
  .module('myApp')
  .controller('channelController', channelController);

channelController.$inject = ['$scope', '$rootScope', '$location', '$interval', '$routeParams', 'ForumService'];
function channelController($scope, $rootScope, $location, $interval, $routeParams, ForumService) {
  let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  let channel = $routeParams.channel;
  let promise; // for interval
  
  // used for identifing the channel
  $scope.info = "Welcome from "+channel;
  // used for styling users messages
  $scope.username = $rootScope.globals.currentUser.username;
  // channel name in scope
  $scope.currentChannel = channel;

  // Update the channel chat
  promise = $interval(function() {
    ForumService.GetAllByChannel(channel)
    .then(function(messages) {
        $scope.channelMessage = messages;
      });
  }, 1000);

  // to stop the interval when changed the route i.e interval will be keep running
  $scope.$on('$destroy', function() {
    $interval.cancel(promise);
  });

  function validChannel() {
    let flag = true;
    // $scope.channels from root controller
    angular.forEach($scope.channels, function(value) {
      if(channel === value.link.split('/')[1])
      {
        flag = false;
      }      
    });
    if(flag) {
      $location.path('/forum');
    }
  }
  validChannel();

  // Add Message
  $scope.addMessage = function() {
    let message = $scope.msg;
    let max_length = 100;

    let username = $scope.username;

    // Char limit from database
    if(message.length > max_length) {
      let toastContent = `<span class="flow-text">Maximum ${max_length} Characters allowed</span>`;  
      Materialize.toast(toastContent, 5000);
      return
    }

    // if(channel)

    // Get the timestamp
    let timenow = new Date();
    timenow = `${timenow.getDate()}-${timenow.getMonth()}-${timenow.getFullYear()} ${days[timenow.getDay()]}`;
    
    // Reset the msg box to empty 
    $scope.msg = "";

    // data object
    let data = {
      channel: channel,
      username: username,
      message: message,
      time: timenow
    }

    // Add Message to Database
    ForumService.AddMessage(data)
      .then(function(response) {
        let toastContent = `<span class="flow-text">${response}</span>`;  
        Materialize.toast(toastContent, 5000);
      })
  }
}