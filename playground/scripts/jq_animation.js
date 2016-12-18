$('#animateButton').click(function(){
  var l = $('.paddle-div-left');
  var r = $('.paddle-div-right');
  var b = $('.my-ball');
  var myBall = $('.full-stop');
$(this).addClass('hidden');
$(this).parent().addClass('hidden');
$('.animate-title').delay(700).fadeIn(2000, function(){
$('#animateTitleThree').removeClass('hidden').delay(700).fadeOut(1300);
});
$('.animate-title').fadeOut(2000, function(){
  $('.animate-title-two').fadeIn(2000).fadeOut(2000, function(){
    $('.animate-title-three').fadeIn(2000).fadeOut(2000, function(){
      $('.animate-title-four').fadeIn(2000).fadeOut(2000, function(){
      $('.animate-area').fadeIn(2000, function(){
      $('.left-paddle').fadeIn(2000);
      $('.ball').fadeIn(2000);
      $('.right-paddle').fadeIn(2000, function(){
        l.animate({'top':'-=200px','opacity':'0.8'}, 1200);
        r.animate({'top':'+=200px','opacity':'0.8'}, 1200);
        l.animate({'top':'+=400px','opacity':'0.8'}, 2000);
        r.animate({'top':'-=400px','opacity':'0.8'}, 2000);
        l.animate({'top':'-=400px','opacity':'0.8'}, 2000);
        r.animate({'top':'+=400px','opacity':'0.8'}, 2000);
        l.animate({'top':'+=400px','opacity':'0.8'}, 2000);
        r.animate({'top':'-=400px','opacity':'0.8'}, 2000);
        l.animate({'top':'-=400px','opacity':'0.8'}, 2000);
        r.animate({'top':'+=400px','opacity':'0.8'}, 2000);
        l.animate({'top':'+=100px','opacity':'0.8'}, 500);
        r.animate({'top':'-=100px','opacity':'0.8'}, 600);
        b.animate({'top':'-=264px','left':'+=900px','opacity':'0.8'}, 1800);
        b.animate({'top':'+=130px','left':'+=300px'}, 1200);
        b.animate({'top':'-=130px','left':'-=500px'}, 1600);
        b.animate({'top':'+=420px','left':'-=700px'}, 2200);
        b.animate({'top':'+=185px','left':'+=500px'}, 1500);
        b.animate({'top':'-=385px','left':'+=770px'}, 1700, function(){
        $('.left-paddle').fadeOut(2000);
        $('.right-paddle').fadeOut(2000);
        $('.ball').fadeOut(2000);
        $('.animate-area').fadeOut(2000, function(){
        $('.pong').fadeIn(1000, function(){
          $('.pong-stop').fadeIn(1, function(){
          myBall.animate({'top':'-295px','left':'450px'}, 600);
          myBall.stop().animate({'top':'-130px','left':'800px'}, 600, function(){
          $('.pong-n').css({'color':'grey'});
          $('.n').animate({'top':'+=10px'},50);
          myBall.animate({'top':'-295px','left':'1100px'}, 600).
          animate({'top':'-50px','left':'1375px'}, 600).
          animate({'top':'140px','left':'1085px'}, 600).delay(10000, function(){
          $('.pong').fadeOut(1000);
          $('.pong-stop').fadeOut(1000).delay(8000, function() {
          $('#animateButton').removeClass('hidden');
          $('#animateButton').parent().removeClass('hidden');
          location.reload();
          });
          });
          });
          });
        });
        });
        });
      });
      });
    });
    });
  });
});
});
