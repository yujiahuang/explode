var questions = [

{ question: 'Hello!', choices: ['A', 'B', 'C', 'D'], answer: 1 },
{ question: 'Hello!', choices: ['A', 'B', 'C', 'D'], answer: 1 },
{ question: 'Hello!', choices: ['A', 'B', 'C', 'D'], answer: 1 },
{ question: 'Hello!', choices: ['A', 'B', 'C', 'D'], answer: 1 },
{ question: 'Hello!', choices: ['A', 'B', 'C', 'D'], answer: 1 },
{ question: 'Hello!', choices: ['A', 'B', 'C', 'D'], answer: 1 },
{ question: 'Hello!', choices: ['A', 'B', 'C', 'D'], answer: 1 }

];

var question_idx = -1;

exports.connect = function(socket){
  // console.log('a user connected!');
  socket.on('player', function(){
    socket.emit('questions', JSON.stringify(questions));
  });

  socket.on('start', function(){
    socket.broadcast.emit('start');
    question_idx = 0;
  });

  socket.on('next', function(){
    ++question_idx;
    socket.broadcast.emit('next', question_idx);
  });

  socket.on('score', function(score){
    console.log(score);
    socket.broadcast.emit('score', score);
  });

}