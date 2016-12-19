var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;


app.use(express.static(__dirname + '/playground'));

app.get('/audio/music/sudStep.mp3', function(req, res) {
  res.send('audio/music/sudstep.mp3');
});

app.listen(PORT, function () {
  console.log('Express listening on port ' + PORT + '!');
});
