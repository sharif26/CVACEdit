angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $window) {

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

    $http.get('http://www.chesterfield.mo.us/cmss_files/mytest.php?type=loadCVAC', {
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
      status = 'Closed'
    else
      status = 'Open'
    $http.get('http://www.chesterfield.mo.us/cmss_files/mytest.php?type=updateCVAC&field='
      + chat.Field + '&status=' + status)
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
  $scope.fetchWO = function(scr) {

    $http.get('http://www.chesterfield.mo.us/cmss_files/mytest.php?type=loadCVAC', {
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
    $http.get('http://www.chesterfield.mo.us/cmss_files/mytest.php?type=updateCVAC&field='
      + chat.Field + '&status=' + chat.Status)
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
