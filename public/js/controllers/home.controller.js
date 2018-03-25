angular
  .module('myApp')
  .controller('homeController', homeController);

homeController.$inject = ['$scope'];
function homeController($scope) {
  $scope.msg = "Welcome from E-krishi";

  $scope.teamMember = [
    {
      name: 'Shashank S Shetty',
      image: 'img/default.jpg',
      info: 'Front End Designed',
      description: 'I wanted to make this application, which will be done '
    },
    {
      name: 'Spandhana ND',
      image: 'img/default.jpg',
      info: 'Documation Head',
      description: 'I wanted to make this application, which will be done '
    },
    {
      name: 'Shreyas Kanchan',
      image: 'img/default.jpg',
      info: 'Assisant Documation & Researcher',
      description: 'I wanted to make this application, which will be done '
    },
    {
      name: 'Noushand',
      image: 'img/default.jpg',
      info: 'Lead Researcher',
      description: 'I wanted to make this application, which will be done '
    }
  ];
}