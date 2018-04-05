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

  // feature discovery
  function init() {
    // Feature Discovery
    $('.tap-target').tapTarget('open');
  }
  init();

  // IoT Section
  $scope.connected = true;

  // result init
  $scope.result = [
    { type: 'Temperature', val: 35, image: 'img/thermometer.png' },
    { type: 'Moisture of soil', val: 4, image: 'img/moisture.png' },
    { type: 'Humidity', val: 73, image: 'img/humidity.png' },
    { type: 'Oxygen', val: 27, image: 'img/oxygen.png' },
    { type: 'Nitrogen', val: 53, image: 'img/nitrogen.png' },
    { type: 'Sunlight intensity', val: 13.5, image: 'img/intensity.png' },
    { type: 'Toxicity level of atmosphere', val: 2, image: 'img/toxicity.png' }
  ]
}