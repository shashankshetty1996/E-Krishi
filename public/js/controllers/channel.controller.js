angular
  .module('myApp')
  .controller('channelController', channelController);

channelController.$inject = ['$scope', '$rootScope', '$interval', '$routeParams', 'ForumService'];
function channelController($scope, $rootScope, $interval, $routeParams, ForumService) {
  let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  let channel = $routeParams.channel;
  
  // used for identifing the channel
  $scope.info = "Welcome from "+channel;
  // used for styling users messages
  $scope.username = $rootScope.globals.currentUser.username;  

  // channel message storage array
  let dummyMsg = [
    {
      username: 'shashankshetty1996',
      message: 'hello',
      time: '24-2-2018 Saturday'
    },
    {
      username: 'noushand8123',
      message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus qui voluptatem minima quia aliquid tempore earum officiis at repudiandae expedita optio aperiam dolor neque, doloremque eaque illo! Illo consequatur commodi veritatis! Porro, sequi nemo. Alias esse dolor autem fuga, fugiat explicabo iste corrupti, vitae voluptates aliquid consequatur omnis veniam vero nulla asperiores repellendus ad assumenda expedita porro sed voluptatem eum quaerat excepturi? Eum explicabo molestias ipsam? Iusto et ea vero, ipsum eius necessitatibus laudantium ex accusamus velit, nesciunt rem, odit molestias deserunt ducimus libero doloremque ad tempora quod reiciendis aspernatur alias perferendis ut dolores! Aperiam nostrum dolorum voluptatibus dolores reprehenderit, laborum odit sint esse alias? Sit, est magnam totam laborum perspiciatis commodi animi necessitatibus ratione magni ex nulla vitae. Omnis molestiae ipsum nihil animi ea aspernatur, quas unde ab obcaecati assumenda debitis neque officia accusantium reiciendis cupiditate adipisci corporis expedita nobis eos dolore. Minima nesciunt ex iste ad ullam, qui molestias temporibus voluptate dolore, deleniti reiciendis necessitatibus doloribus velit adipisci aliquid soluta ipsam itaque cum unde asperiores voluptatum quo quam nisi! Non, odit at, ut molestias ipsum quasi omnis exercitationem quo qui facere dolorem quidem totam cum blanditiis! Ab dolor necessitatibus incidunt blanditiis odit similique iure voluptatibus praesentium vero minima, beatae eum consequuntur quae nam tempora dolorem numquam temporibus omnis ipsum, nemo aut hic, repudiandae optio reprehenderit. Eaque doloribus obcaecati, fugit exercitationem qui quis dolorum nisi ratione pariatur animi corporis, eveniet laboriosam nulla esse facere. Libero, aliquid blanditiis sed veritatis laboriosam animi consequatur deleniti delectus atque ex pariatur perferendis sapiente. Necessitatibus adipisci quidem sint aut.',
      time: '24-2-2018 Saturday'
    },
    {
      username: 'shashankshetty1996',
      message: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque odit temporibus id. Culpa modi nobis laboriosam, quod odio repellendus debitis!',
      time: '24-2-2018 Saturday'
    },
    {
      username: 'kanchanshreyas',
      message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus qui voluptatem minima quia aliquid tempore earum officiis at repudiandae expedita optio aperiam dolor neque, doloremque eaque illo! Illo consequatur commodi veritatis! Porro, sequi nemo. Alias esse dolor autem fuga, fugiat explicabo iste corrupti, vitae voluptates aliquid consequatur omnis veniam vero nulla asperiores repellendus ad assumenda expedita porro sed voluptatem eum quaerat excepturi? Eum explicabo molestias ipsam? Iusto et ea vero, ipsum eius necessitatibus laudantium ex accusamus velit, nesciunt rem, odit molestias deserunt ducimus libero doloremque ad tempora quod reiciendis aspernatur alias perferendis ut dolores! Aperiam nostrum dolorum voluptatibus dolores reprehenderit, laborum odit sint esse alias? Sit, est magnam totam laborum perspiciatis commodi animi necessitatibus ratione magni ex nulla vitae. Omnis molestiae ipsum nihil animi ea aspernatur, quas unde ab obcaecati assumenda debitis neque officia accusantium reiciendis cupiditate adipisci corporis expedita nobis eos dolore. Minima nesciunt ex iste ad ullam, qui molestias temporibus voluptate dolore, deleniti reiciendis necessitatibus doloribus velit adipisci aliquid soluta ipsam itaque cum unde asperiores voluptatum quo quam nisi! Non, odit at, ut molestias ipsum quasi omnis exercitationem quo qui facere dolorem quidem totam cum blanditiis! Ab dolor necessitatibus incidunt blanditiis odit similique iure voluptatibus praesentium vero minima, beatae eum consequuntur quae nam tempora dolorem numquam temporibus omnis ipsum, nemo aut hic, repudiandae optio reprehenderit. Eaque doloribus obcaecati, fugit exercitationem qui quis dolorum nisi ratione pariatur animi corporis, eveniet laboriosam nulla esse facere. Libero, aliquid blanditiis sed veritatis laboriosam animi consequatur deleniti delectus atque ex pariatur perferendis sapiente. Necessitatibus adipisci quidem sint aut.'
    },
  ];

  // Update the channel chat
  $interval(function() {
    ForumService.GetAllByChannel(channel)
    .then(function(messages) {
        $scope.channelMessage = messages;
      });
  }, 1000);

  // Add Message
  $scope.addMessage = function() {
    let message = $scope.msg;
    let max_length = 100;

    let username = $scope.username;

    if(message.length > max_length) {
      let toastContent = `<span class="flow-text">Maximum ${max_length} Character</span>`;  
      Materialize.toast(toastContent, 5000);
      return
    }

    let timenow = new Date();
    timenow = `${timenow.getDate()}-${timenow.getMonth()}-${timenow.getFullYear()} ${days[timenow.getDay()]}`;
    $scope.msg = "";

    // data object
    let data = {
      channel: channel,
      username: username,
      message: message,
      time: timenow
    }

    ForumService.AddMessage(data)
      .then(function(response) {
        let toastContent = `<span class="flow-text">${response}</span>`;  
        Materialize.toast(toastContent, 5000);
      })
  }
}