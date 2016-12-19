window.onload = function() {
    document.getElementById("breakoutMusic").play();
};

function toggleMusic() {
  var breakoutMusic = document.getElementById('breakoutMusic');
  if (breakoutMusic.paused)
    breakoutMusic.play();
  else
    breakoutMusic.pause();
}


// Canvas
var canvas = document.getElementById('breakoutCanvas');
var ctx = canvas.getContext('2d');
// Ball
var x = canvas.width/2; //starting ball position, used in drawball
var y = canvas.height-30; //starting ball position, used in drawball
var ballRadius = 10;
var dx = 2;  //starting ball direction
var dy = -2; //starting ball direction
// Paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;
// Controls
var rightPressed = false;
var leftPressed = false;
// Level
var level = 1;
var maxLevel = 5;
// Bricks
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
// Score
var score = 0;
var scorePlusBasic = 20;
var maxScore = 2500;
// Lives
var lives = 3;


document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler);
document.addEventListener('touchmove', touchMoveHandler);

var bricks = [];
  for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
      for (r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
  }

function keyDownHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = true;
  } else if(e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.keyCode === 39) {
    rightPressed = false;
  } else if(e.keyCode === 37) {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 + (paddleWidth / 2) && relativeX < canvas.width - (paddleWidth / 2)) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function touchMoveHandler(e) {
  var touch = e.touches[0];
  var relativeX = touch.clientX - canvas.offsetLeft;
  if(relativeX > 0 + (paddleWidth / 2) && relativeX < canvas.width - (paddleWidth / 2)) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = '#818383';
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, (canvas.height - paddleHeight) - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#818383';
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  // loop through bricks arrays to draw bricks
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      if(bricks[c][r].status === 1 ) {
      // Bricks positioned by loop index * (brick width + padding) + offset
        var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.strokeStyle = '5px, #818383';
        ctx.stroke();
        if (r === 0){
        ctx.fillStyle = '#C67171';
      } else if (r === 2) {
        ctx.fillStyle = '#0095DD';
      } else if (r === 1){
        ctx.fillStyle = '#EDC393';
      } else {
        ctx.fillStyle = '#AAA6A2';
      }
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function collisionDetection() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status === 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          // change b.status so brick doesn't draw
          b.status = 0;
          // add 20 to score
          score += scorePlusBasic;
          // adds one to level and redraws all bricks
          //for every level above one remove 5 lots of 20
          if (score === (brickRowCount * brickColumnCount * scorePlusBasic * level) - ((((level - 1) * level)  / 2) * (brickColumnCount * scorePlusBasic))  && level < maxLevel) {
            // reinitiate bricks array
            brickRowCount++;
            bricks = [];
              for (c = 0; c < brickColumnCount; c++) {
                bricks[c] = [];
                  for (r = 0; r < brickRowCount; r++) {
                    bricks[c][r] = { x: 0, y: 0, status: 1 };
                  }
              }
            //add one to level
            level++;
            //reset draw area
            resetLevel();
            drawPause();
          }
          else if (score === maxScore) {
            drawWinnerMessage();
            clearInterval(drawLoop);
          }
        }
    }
    }
  }
}

function drawPause() {
  clearInterval(drawLoop);
  setTimeout( function() {
    drawLoop = setInterval(draw, 10);
  }, 2000);
}

function resetLevel() {
  x = canvas.width / 2;
  y = canvas.height - 30;
  dx = 2;
  dy = -2;
  paddleX = (canvas.width - paddleWidth) / 2;
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#000';
  ctx.fillText('Score: ' + score, canvas.width - 100, 20);
}

function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#000';
  ctx.fillText('Lives: ' + lives, 5, 20);
}

function drawLevel() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#000';
  ctx.fillText('Level: ' + level, 210, 20);
}

function drawLifeLost() {
  ctx.font = 'bold 32px Arial';
  ctx.fillStyle = '#000';
  ctx.fillText('You lost a life :(', 115, 160);
}

function drawGameOver() {
  ctx.font = 'bold 48px Arial';
  ctx.fillStyle = '000';
  ctx.fillText('GAME OVER', 90, 160);
  ctx.font = '16px Arial';
  ctx.fillStyle = '#FF0000';
  ctx.fillText('Press the restart button to try again', 115, 190);
}

function drawWinnerMessage() {
  ctx.font = 'bold 48px Arial';
  ctx.fillStyle = '000';
  ctx.fillText('WINNER!!!', 115, 160);
  ctx.font = '16px Arial';
  ctx.fillStyle = '#FF0000';
  ctx.fillText('Press the restart button to try again', 115, 190);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clears area within given boundries
  collisionDetection();
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  drawLevel();

  // If ball hits left or right canvas edge, reverse x direction
    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
  // If ball hits top canvas edge, reverse y direction
    if (y + dy < ballRadius) {
      dy = -dy;
  // If ball hits bottom edge but not paddle, game over triggered
}   if ((y + dy > canvas.height - (ballRadius + paddleHeight)) && (x > paddleX && x < paddleX + paddleWidth)) {
          dy = -dy;
          dx += (Math.random() / 2);
          console.log(dx);
        } else if (y + dy > canvas.height - ballRadius){
          lives--;
          if(!lives) {
            drawGameOver();
            clearInterval(drawLoop);
          } else {
            drawLifeLost();
            drawPause();
            resetLevel();
          }
      }
  // conditionals for moving paddles
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
      paddleX -=7;
    }
    x += dx;
    y += dy;
}

var drawLoop = setInterval(draw, 10); //sets repeat on function draw with interval 10 milliseconds
