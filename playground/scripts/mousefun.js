
$('pre').on({
  mouseenter : function(){
  var colourRandom = (Math.floor(Math.random()*16));
  if (colourRandom === 10) {
    colourRandom = "A";
  } else if (colourRandom === 11) {
    colourRandom = "B";
  } else if (colourRandom === 12) {
    colourRandom = "C";
  } else if (colourRandom === 13) {
    colourRandom = "D";
  } else if (colourRandom === 14) {
    colourRandom = "E";
  } else if (colourRandom === 15) {
    colourRandom = "F";
  }
  var colourRandomTwo = (Math.floor(Math.random()*16));
  if (colourRandomTwo === 10) {
    colourRandomTwo = "A";
  } else if (colourRandomTwo === 11) {
    colourRandomTwo = "B";
  } else if (colourRandomTwo === 12) {
    colourRandomTwo = "C";
  } else if (colourRandomTwo === 13) {
    colourRandomTwo = "D";
  } else if (colourRandomTwo === 14) {
    colourRandomTwo = "E";
  } else if (colourRandomTwo === 15) {
    colourRandomTwo = "F";
  }
  var colourRandomThree = (Math.floor(Math.random()*16));
  if (colourRandomThree === 10) {
    colourRandomThree = "A";
  } else if (colourRandomThree === 11) {
    colourRandomThree = "B";
  } else if (colourRandomThree === 12) {
    colourRandomThree = "C";
  } else if (colourRandomThree === 13) {
    colourRandomThree = "D";
  } else if (colourRandomThree === 14) {
    colourRandomThree = "E";
  } else if (colourRandomThree === 15) {
    colourRandomThree = "F";
  }
  var colourRandomFour = (Math.floor(Math.random()*16));
  if (colourRandomFour === 10) {
    colourRandoFoure = "A";
  } else if (colourRandomFour === 11) {
    colourRandomFour = "B";
  } else if (colourRandomFour === 12) {
    colourRandomFour = "C";
  } else if (colourRandomFour === 13) {
    colourRandomFour = "D";
  } else if (colourRandomFour === 14) {
    colourRandomFour = "E";
  } else if (colourRandomFour === 15) {
    colourRandomFour = "F";
  }
  var colourRandomFive = (Math.floor(Math.random()*16));
  if (colourRandomFive === 10) {
    colourRandomFive = "A";
  } else if (colourRandomFive === 11) {
    colourRandomFive = "B";
  } else if (colourRandomFive === 12) {
    colourRandomFive = "C";
  } else if (colourRandomFive === 13) {
    colourRandomFive = "D";
  } else if (colourRandomFive === 14) {
    colourRandomFive = "E";
  } else if (colourRandomFive === 15) {
    colourRandomFive = "F";
  }
  var colourRandomSix = (Math.floor(Math.random()*16));
  if (colourRandomSix === 10) {
    colourRandomSix = "A";
  } else if (colourRandomSix === 11) {
    colourRandomSix = "B";
  } else if (colourRandomSix === 12) {
    colourRandomSix = "C";
  } else if (colourRandomSix === 13) {
    colourRandomSix = "D";
  } else if (colourRandomSix === 14) {
    colourRandomSix = "E";
  } else if (colourRandomSix === 15) {
    colourRandomSix = "F";
  }
  var randomColourTwo = "#" + colourRandom + colourRandomTwo + colourRandomThree + colourRandomFour + colourRandomFive + colourRandomSix;
  $(this).css('background-color',randomColourTwo);
},
click: function(){
  $('pre').fadeOut(3000);
}
});



$('pre').doubleclick(function(){
  $('pre').css('background-color','#e3e0cf');
});
