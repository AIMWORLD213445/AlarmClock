var Alarm = require('./../js/alarm.js').alarmModule;

var displayAlarmTime = function(alarmMoment){
  $('#alarm-countdown').text("Alarm set for: " + alarmMoment.format("MM DD YYYY HH:mm"));
};

var displayAlarmSounding = function() {
  $('#alarm-message').text("alarm sounding!");
}

var cleanup = function(){
  $('#alarm-countdown').text("");
  $("#time-form").show();
  $('#alarm-message').text("");
};

var updateTime = function(){
  $('#current-time').text(moment().format("HH:mm:ss"));
}

$(document).ready(function() {

  var alarm = new Alarm();
  alarm.startClock(updateTime, cleanup);

  $('#time-form').submit(function(event) {
    event.preventDefault();
    $(this).hide();
    $('#alarm-message').text("alarm set!");
    var time = $('#time').val();
    alarm.setAlarm(time, displayAlarmTime, displayAlarmSounding);
  });

  $('#snooze').click(function() {
    alarm.snooze(5, displayAlarmTime);
  });

  $('#reset').click(function() {
    alarm.reset(cleanup);
  });
});
