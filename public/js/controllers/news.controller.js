angular.module("myApp").controller("newsController", newsController);

newsController.$inject = ["$scope"];
function newsController($scope) {
  $scope.msg = "Get Updated with what's actually happening!";

  $scope.news = [
    {id: 1, link: '#!news/1', title: 'Title 1', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis dignissimos dolorem deleniti ipsum eos est at quam, esse aliquam, perspiciatis voluptas itaque fuga necessitatibus maxime voluptatibus suscipit exercitationem, quasi autem.'},
    {id: 2, link: '#!news/2', title: 'Title 2', content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim aperiam maiores excepturi similique, quam a omnis sint doloremque eligendi modi numquam, explicabo alias libero aspernatur temporibus officiis asperiores impedit assumenda?'},    
  ];
}