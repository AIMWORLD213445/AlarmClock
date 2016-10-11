function Alarm(){
  this.timeOut = 0;
  this.alarmIsSounding = false;
  this.alarmMoment = null;
  this.alarmIntervalId;
}

Alarm.prototype.startClock = function(updateTime, cleanup){
  window.setInterval(function(){
    updateTime();
    if(this.alarmIsSounding){
      this.timeOut++;
    }
    if(this.timeOut > 10){
      cleanup();
      this.timeOut = 0;
      this.alarmIsSounding = false;
    }
  }, 1000);
}

Alarm.prototype.setAlarm = function(time, displayAlarmTime, displayAlarmSounding){
  this.alarmMoment = moment(time,"HH:mm");
  if (moment().isAfter(this.alarmMoment, "minute")) {
    this.alarmMoment = moment(time,"HH:mm").add(1, "days");
  }
  displayAlarmTime(this.alarmMoment);
  var alarmMoment = this.alarmMoment;
  this.alarmIntervalId = window.setInterval(function(){
    if (moment().isSame(alarmMoment, "minute")) {
      console.log(alarmMoment)
      displayAlarmSounding();
      clearInterval(id);
      this.alarmIsSounding = true;
    }
  }, 1000);

}

Alarm.prototype.snooze = function(minutes, displayAlarmTime){
  this.alarmMoment = this.alarmMoment.add(minutes,'minutes');
  displayAlarmTime(this.alarmMoment);
}

Alarm.prototype.reset = function(cleanup){
  clearInterval(this.alarmIntervalId);
  cleanup();
  this.timeOut = 0;
  this.alarmIsSounding = false;
}

exports.alarmModule = Alarm;
