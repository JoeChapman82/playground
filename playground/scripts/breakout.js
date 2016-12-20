
// Canvas
var canvas = document.getElementById('breakoutCanvas');
var ctx = canvas.getContext('2d');
// Ball
var x = canvas.width / 2; //starting ball position, used in drawball
var y = canvas.height - 45; //starting ball position, used in drawball
var ballRadius = 10;
var dx = 2;  //starting ball direction
var dy = -2; //starting ball direction
// Paddle
var paddleHeight = 15;
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
// Pause feature
var breakoutPaused = false;
// Others
var drawLoop; // for initialsiing game
var introLoop; // for initialising Intro
var gamePlaying = false;

document.onload = breakoutIntroStart();


function toggleMusic() {
  var breakoutMusic = document.getElementById('breakoutMusic');
  if (breakoutMusic.paused) {
    breakoutMusic.play();
    document.getElementById('breakoutMusicButton').innerHTML = "Stop music";
    document.getElementById('breakoutText').innerHTML = "Music: ASCII Visions by Sudstep";
}  else {
    breakoutMusic.pause();
    document.getElementById('breakoutMusicButton').innerHTML = "Play music";
    document.getElementById('breakoutText').innerHTML = "";
}
}

function breakoutPauseResume() {
  if (breakoutPaused === false && gamePlaying === true) {
  document.getElementById('breakoutPauseButton').innerHTML = "Resume";
  clearInterval(drawLoop);
  breakoutPaused = true;
} else if (breakoutPaused === true) {
  document.getElementById('breakoutPauseButton').innerHTML = "Pause";
  drawLoop = setInterval(draw, 10);
  breakoutPaused = false;
}
}


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
  } else if(e.keyCode === 80) {
    breakoutPauseResume();
  }
}

//  e.which + con.log will log which key was used
//  console.log('Key pressed was: ' + e.which);

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
  ctx.fillStyle = 'grey';
  ctx.fill();
  ctx.strokeStyle = '5px #000000';
  ctx.stroke();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, (canvas.height - paddleHeight) - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#818383';
  ctx.fill();
  ctx.strokeStyle = '5px #000000';
  ctx.stroke();
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
  y = canvas.height - 40;
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

function restartGame() {
  if (gamePlaying === false) {
    clearInterval(introLoop);
    document.getElementById('breakoutStartButton').innerHTML = "Restart game";
    gamePlaying = true;
  }
  clearInterval(drawLoop);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  brickRowCount = 3;
  bricks = [];
    for (c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
        for (r = 0; r < brickRowCount; r++) {
          bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
      }
      score = 0;
      lives = 3;
      level = 1;
      resetLevel();
      draw();
      drawPause();
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
}   if ((y + dy > canvas.height - (ballRadius + paddleHeight + 10)) && (x > paddleX && x < paddleX + paddleWidth)) {
          dy = -dy;
          dx += (Math.random() / 2);
        } else if (y + dy > canvas.height - ballRadius){
          lives--;
          if(!lives) {
            drawGameOver();
            clearInterval(drawLoop);
          } else {
            drawLifeLost();
            resetLevel();
            drawPause();
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

function breakoutStartGame() {
}
// drawLoop = setInterval(draw,10); //sets repeat on function draw with interval 10 milliseconds

function breakoutIntro() {
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#424242';
  ctx.fill();
  ctx.closePath();
  ctx.font = 'bold 48px Arial';
  ctx.fillStyle = '#C67171';
  ctx.fillText('BREAKOUT', 100, 160);
  ctx.font = 'bold 48px Arial';
  ctx.fillStyle = 'red';
  ctx.font = '16px Arial';
  ctx.fillStyle = '#C67171';
  ctx.fillText('Click start to play!', 175, 190);
  drawBall();
  x += dx;
  y += dy;
  if(x + dx > canvas.width - ballRadius || x + dx < ballRadius || (y + dy >= 122 && y + dy <= 168 && x + dx >= 100 && x + dx <= 370) || (y + dy >= 173 && y + dy <= 193 && x + dx >= 175 && x + dx <= 320)) {
    dx = -dx;
  }
  if ((y + dy < ballRadius) || (y + dy > canvas.height - ballRadius) || (y + dy >= 120 && y + dy <= 170 && x + dx >= 100 && x + dx <= 350) || (y + dy >= 175 && y + dy <= 195 && x + dx >= 175 && x + dx <= 320)) {
      dy = -dy;
}
}

function breakoutIntroStart() {
introLoop = setInterval(breakoutIntro, 10);
}
