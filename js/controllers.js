angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $window) {

// to support device width, height
  $scope.dwidth = $window.innerWidth;
  $scope.dheight = $window.innerHeight;

})

.controller('ChatsCtrl', function($scope, $http, $ionicModal, $ionicListDelegate, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
  $scope.fetchWO = function(scr) {
//url to get list of cvac fields & their status
    $http.get('', {
    }, {
      headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
      }
    })
    .success(function(data,status,headers,config){
      //console.log(data);
      $scope.chats = data;
      Chats.chats = data;

      if(scr==1)
        $scope.$broadcast('scroll.refreshComplete');
    })
    .error(function(data,status,headers,config){
      console.error('Err', data);
    });
  };

  $scope.remove = function(chat) {
//      $scope.chats.splice($scope.chats.indexOf(chat), 1);
    var status = '';
    if( chat.Status == 'Open'  )
      status = 'Closed';
    else
      status = 'Open'';
    
    url = ''; //xhr url to modify the field status
    $http.get(url+'&field='+ chat.Field + '&status=' + status)
    .success(function(data,status,headers,config){
      //$scope.chat = data;
      //Chats.chats = data;
      console.log(data);
      $scope.fetchWO(0);
      $ionicListDelegate.closeOptionButtons();
      //if(data=="1")
      //  $scope.closeNewTask();
      //Chats.chats = data;
    })
    .error(function(data,status,headers,config){
      console.error('Err', data);
    });

  };

  $scope.doRefresh = function() {
    $scope.fetchWO(1);
  };

  $scope.fetchWO(0);

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $http, $ionicModal, Chats) {
/*  $scope.settings = {
    enableFriends: true
  };
*/
// need to figure out how to reuse code from various controllers

  $scope.fetchWO = function(scr) {
////url to get list of cvac fields & their status
    $http.get('', {
    }, {
      headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
      }
    })
    .success(function(data,status,headers,config){
      //console.log(data);
      $scope.chats = data;
      Chats.chats = data;
      if(scr==1)
        $scope.$broadcast('scroll.refreshComplete');
    })
    .error(function(data,status,headers,config){
      console.error('Err', data);
    });
  };

  $scope.doRefresh = function() {
    $scope.fetchWO(1);
  };

  $scope.fetchWO(0);

  $scope.pushNotificationChange = function(chat) {
    console.log('Push Notification Change', chat);
    url = ''; //xhr url to modify the field status
    $http.get(url+'&field=' + chat.Field + '&status=' + chat.Status)
    .success(function(data,status,headers,config){
      //$scope.chat = data;
      //Chats.chats = data;
      console.log(data);
      //if(data=="1")
      //  $scope.closeNewTask();
      //Chats.chats = data;
    })
    .error(function(data,status,headers,config){
      console.error('Err', data);
    });

  };

});
