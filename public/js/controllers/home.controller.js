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
      info: 'Lead Dev',
      description: 'I wanted to make this application, which will be done '
    },
    {
      name: 'Spandana ND',
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
      name: 'Naushad',
      image: 'img/default.jpg',
      info: 'Lead Researcher',
      description: 'I wanted to make this application, which will be done '
    }
  ];


  // IoT Section
  $scope.connected = true;

  // result init
  $scope.result = [
    { type: 'Temperature', val: 0, image: 'img/thermometer.png' },
    { type: 'Moisture of soil', val: 0, image: 'img/moisture.png' },
    { type: 'Humidity', val: 0, image: 'img/humidity.png' },
    { type: 'Oxygen', val: 0, image: 'img/oxygen.png' },
    { type: 'Nitrogen', val: 0, image: 'img/nitrogen.png' },
    { type: 'Sunlight intensity', val: 0, image: 'img/intensity.png' },
    { type: 'Toxicity level of atmosphere', val: 0, image: 'img/toxicity.png' }
  ]
}