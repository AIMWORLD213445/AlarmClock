// var Weather = require('./../js/weather.js').weatherModule;
//
// var displayHumidity = function(city, humidityData) {
//   $('.showWeather').text("The humidity in " + city + " is " + humidityData + "%");
// }

$(document).ready(function() {
  $('#alarm-clock').submit(function(event) {
    event.preventDefault();
    $('#alarm-message').text("alarm set!");
    var hours = $('#hours').val();
    var minutes = $('#minutes').val();



    var id = window.setInterval(function(){
      $('#current-time').text(moment().format("HH:mm:ss a"));
      $('#alarm-countdown').text("Alarm set for: " + moment().hours(hours).minutes(minutes).format("HH:mm a")).css("color","red");
      if (moment().isSame(moment().hours(hours).minutes(minutes), "minute")) {
        $('#alarm-message').text("alarm sounding!");
      }
    }, 1000);

    $('#snooze').click(function() {
      minutesInt = parseInt(minutes);
      minutesInt +=5;
      minutes = minutesInt.toString();
    });
  });
});
