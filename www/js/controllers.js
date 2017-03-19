angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
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
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('getUsersCtrl', function($http, $scope, $ionicPopup){

  if(window.localStorage.getItem('alldata')== null || window.localStorage.getItem('alldata')== undefined || window.localStorage.getItem('alldata') == '')
  {
    $http({
      method: 'GET',
      url: 'https://randomuser.me/api/?results=500'
    }).then(function successCallback(response) {
        var responsedata = response.data;
        console.log(responsedata);
        $scope.items = responsedata.results;
        window.localStorage.steItem('alldata', responsedata.results);
      }, function errorCallback(response) {
        $scope.showAlert = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Something Went Wrong',
            template: response
          });
          alertPopup.then(function(res) {
            console.log('Thank you for not eating my delicious ice cream cone');
          });
        };
    });
  }
  else {
    $scope.items = window.localStorage.getItem('alldata');
  }

})

