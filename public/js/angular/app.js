var app = angular.module('app', []);

app.controller('ball', function($scope){

  var socket = io();
  $scope.fresh = true;
  $scope.score = 100;

  $scope.touchBall = function(){
    if($scope.fresh){
      console.log('start');
      socket.emit('start');
      $scope.fresh = false;
    }
    else {
      socket.emit('next');
    }
  }

  socket.on('score', function(s){
    $scope.score += s;
    $scope.$apply();
  });

});

app.directive('expand', function(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      scope.$watch('score', function(score) {

        if(score >= 10000){
          element.addClass('explode');
          return;
        }

        // 10% ~ 90%
        // 100 ~ 10000
        // p = ( 80s + 91000 ) / 9900
        var size = (80*score + 91000)/9900;

        element.css({ 
          width: size + '%',
          height: size + 'vw',
          lineHeight: size + 'vw'
        })
        .addClass('bounce');
        setTimeout(function(){ element.removeClass('bounce'); }, 600);
      });
    }
  };
});

app.controller('player', function($scope){

  // socket
  var socket = io();
  socket.emit('player');
  console.log('play');

  $scope.question_idx = -1;
  socket.on('questions', function(msg){

    $scope.questions = JSON.parse(msg);
    $scope.$apply();
    console.log($scope.questions);

  });

  socket.on('start', function(){

    // show first question
    console.log($scope.questions[0]);
    $scope.question_idx = 0;
    $scope.$apply();

  });

  socket.on('next', function(idx){

    // show next question
    console.log('next: ' + idx);
    $scope.question_idx = idx;
    $scope.answerShown = false;
    $scope.selected = -1;
    $scope.$apply();

  });

  // buttons
  $scope.selected = -1;
  $scope.select = function(idx) {
    if(!$scope.answerShown) $scope.selected = idx;
  }
  $scope.isAnswer = function(idx) {
    return (idx == $scope.questions[$scope.question_idx].answer) && $scope.answerShown;
  }
  $scope.send = function() {
    if(!$scope.answerShown){
      var score = calculateScore();
      socket.emit('score', score);
      $scope.answerShown = true;
    }
  }

  // helpers
  var calculateScore = function(){
    var correct = 200;
    var wrong = 50;
    return $scope.selected == $scope.questions[$scope.question_idx].answer ? correct : wrong;
  }

});