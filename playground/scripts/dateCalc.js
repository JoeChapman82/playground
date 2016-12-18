var addDate = function() {
  var todayDate = new Date();
  var days = parseInt(document.getElementById('yourDays').value);
  var months = parseInt(document.getElementById('yourMonths').value);
  var year = todayDate.getFullYear();
  var month = todayDate.getMonth() + months;
  var otherMonths = [0,2,4,6,7,9];
  var monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  // To cover December moving to January
  futureDate = todayDate.getDate() + days;
  do {
  if (month > 11){
    month -= 12; year += 1;
  }
  // Where month has 30 days
  if ((month === 3 || month === 5 || month === 8 || month === 10) && (futureDate > 30)) {
    month += 1; futureDate -= 30;
  }
  //For December, February then all remaining months when adding days
    if (month === 11 && futureDate > 31) {
    month -= 11; futureDate -= 31; year += 1;
  } if (month === 1 && futureDate > 29 && (year % 4) === 0 && (year % 100) !== 0) {
    month += 1; futureDate -= 29;
  } if (month === 1 && futureDate > 28 && (year % 4) === 0 && (year % 100) === 0 && (year % 400) !== 0) {
    month += 1; futureDate -= 28;
  } if (month === 1 && futureDate > 29 && (year % 4) === 0 && (year % 100) === 0 && (year % 400) === 0) {
    month += 1; futureDate -= 29;
  } if (month === 1 && futureDate > 28 && (year % 4) !== 0) {
    month += 1; futureDate -= 28;
  } if (otherMonths.indexOf[month] !== -1 && futureDate > 31 ) {
    month += 1; futureDate -= 31;
  }} while((futureDate >= 32) ||
          (month === 1 && futureDate > 29 && (year % 4) === 0 && (year % 100) !== 0) ||
          (month === 1 && futureDate > 28 && (year % 4) === 0 && (year % 100) === 0 && (year % 400) !== 0) ||
          (month === 1 && futureDate > 29 && (year % 4) === 0 && (year % 100) === 0 && (year % 400) === 0) ||
          (month === 1 && futureDate > 28 && (year % 4) !== 0) ||
          ((month === 3 || month === 5 || month === 8 || month === 10) && (futureDate > 30))
        );
  //Add correct endings for days
  if (futureDate === 1 || futureDate === 21 || futureDate === 31){
    futureDate += "st";
  } else if (futureDate === 2 || futureDate === 22) {
    futureDate += "nd";
  } else if (futureDate === 3 || futureDate === 23) {
    futureDate += "rd";
  } else {
    futureDate += "th";
  }
  document.getElementById('dateMessage').innerHTML = ("The date will be " + (futureDate + " " + monthName[month] + " " + year));
};
/**
$('.addSeven').html(addDate(0,0));
**/
  myDate = new Date();
document.getElementById('dateNow').innerHTML = myDate;

$('h1').click(function(){
  $(this).hide();
});
