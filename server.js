var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;


app.use(express.static('playground'));

app.listen(PORT, function () {
  console.log('Express listening on port ' + PORT + '!');
});
