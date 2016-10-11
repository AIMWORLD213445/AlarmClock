$(document).ready(function() {
  var timeOut = 0;
  var alarmIsSounding = false;

  window.setInterval(function(){
    $('#current-time').text(moment().format("HH:mm:ss"));
    if(alarmIsSounding){
      timeOut++;
    }
    if(timeOut > 10){
      $('#alarm-countdown').text("");
      $("#time-form").show();
      $('#alarm-message').text("");
      timeOut = 0;
      alarmIsSounding = false;
    }
  }, 1000);

  $('#time-form').submit(function(event) {
    event.preventDefault();
    $(this).hide();

    $('#alarm-message').text("alarm set!");
    var time = $('#time').val();
    var alarmMoment = moment(time,"HH:mm");
    $('#alarm-countdown').text("Alarm set for: " + alarmMoment.format("HH:mm")).css("color","red");

    var id = window.setInterval(function(){
      if (moment().isSame(alarmMoment, "minute")) {
        $('#alarm-message').text("alarm sounding!");
        clearInterval(id);
        alarmIsSounding = true;
      }
    }, 1000);

    $('#snooze').click(function() {
      alarmMoment = alarmMoment.add(5,'minutes');
      $('#alarm-countdown').text("Alarm set for: " + alarmMoment.format("HH:mm")).css("color","red");
    });
    
    $('#reset').click(function() {
      clearInterval(id);
      $('#alarm-countdown').text("");
      $("#time-form").show();
      $('#alarm-message').text("");
    });
  });
});
