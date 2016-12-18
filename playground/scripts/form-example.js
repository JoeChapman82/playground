
function nameResponse() {
  var nameAnswer = document.getElementById("yourName").value;
  var time = new Date().getHours();

  if (time < 12) {
  document.getElementById("nameMessage").innerHTML = "Good morning " + nameAnswer;
}
else if (time < 18) {
  document.getElementById("nameMessage").innerHTML = "Good afternoon " + nameAnswer;
}
else {
  document.getElementById("nameMessage").innerHTML = "Good evening " + nameAnswer;
}
}
