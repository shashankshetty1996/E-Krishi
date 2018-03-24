angular.module("myApp").controller("forumController", forumController);

forumController.$inject = ["$scope"];
function forumController($scope) {
  $scope.msg = "Welcome from forum section";

  $scope.rules = [
    {
      id: 1,
      rule: "No starting of drama or harassment of other members."
    },
    {
      id: 2,
      rule: "No NSFW content."
    },
    {
      id: 3,
      rule: "No Spamming."
    },
    {
      id: 4,
      rule: "Please keep the chats relevant to their purpose."
    },
    {
      id: 5,
      rule: "Swearing is allowed but not in use to hurt or offend others."
    },
    {
      id: 6,
      rule: "No advertising of other products except agriculture."
    },
    {
      id: 7,
      rule: "No self-promotion of any kind unless authorized by a Moderator."
    },
    {
      id: 8,
      rule: "No obnoxious/trollish behavior."
    },
    {
      id: 9,
      rule: "Keep chats civil."
    },
    {
      id: 10,
      rule: "Be respectful of the staff and fellow users."
    }
  ];  
}