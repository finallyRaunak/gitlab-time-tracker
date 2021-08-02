window.onload = () => {

  const wrapper = document.createElement('div');
  wrapper.id = "wh-gtt-wrapper";
  wrapper.class = "block";
  wrapper.innerHTML = "<span id='wh-gtt-title'>Track Time</span>";
  wrapper.innerHTML += "<span id='wh-gtt-time'>00:00:00</span>";
  wrapper.innerHTML += "<div id='wh-gtt-btn'>";
  wrapper.innerHTML += "<button type='button' name='start' id='wh-gtt-go'>Start</button>";
  wrapper.innerHTML += "<button type='button' name='stop' id='wh-gtt-stop'>Stop</button>";
  wrapper.innerHTML += "<input type='hidden' name='wh-gtt-in-sec' value='0'>";
  wrapper.innerHTML += "</div>";

  document.querySelector("#content-body > aside > div > form > div:nth-child(3)").after(wrapper);

  setTimeout(function () {
    initStopWatch();
  }, 3000);


}

function initStopWatch() {
  console.log('initStopWatch');

  const elTime = document.getElementById("wh-gtt-time");
  const elStop = document.getElementById("wh-gtt-stop");
  const elStart = document.getElementById("wh-gtt-go");
  const elTimerInput = document.getElementsByName("wh-gtt-in-sec")[0];
  let Interval;
  let timerStarted = false;

  elStart.onclick = function () {
    //clicked on pause btn
    if (timerStarted === true) {
      timerStarted = false;
      elStart.innerHTML = 'Start'
      console.log('Tracking: paused.');
      clearInterval(Interval);
    }
    //cliecked on play btn
    else {
      timerStarted = true;
      elStart.innerHTML = 'Pause'
      console.log('Tracking: Started');
      clearInterval(Interval);
      Interval = setInterval(startTimer, 1000);
    }

  }

  elStop.onclick = function () {
    timerStarted = false;
    elStart.innerHTML = 'Start'

    const comment = document.getElementById('note-body');
    comment.value = '/spend ' + formatSecondToSpend(elTimerInput.value) + ' \n'

    elTimerInput.value = 0;
    console.log('Tracking: Stoped');
    clearInterval(Interval);
    elTime.innerHTML = "00:00:00";
  }
}

function startTimer() {

  const elTime = document.getElementById("wh-gtt-time");
  const elTimerInput = document.getElementsByName("wh-gtt-in-sec")[0];
  seconds = Number(elTimerInput.value) + 1;
  elTimerInput.value = seconds;

  elTime.innerHTML = formatSecondToTimeStr(seconds);

}

function formatSecondToTimeStr(timeInSecond) {
  var date = new Date(0);
  date.setSeconds(timeInSecond);
  var timeString = date.toISOString().substr(11, 8);
  console.log(timeString)
  return timeString;
}

function formatSecondToSpend(timeInSecond) {
  var hrs = ~~(timeInSecond / 3600);
  var mins = ~~((timeInSecond % 3600) / 60);

  // Output like "1h" or "4h3m"
  var ret = "";
  if (hrs > 0) {
    ret += "" + hrs + "h";
  }
  ret += "" + mins + "m";
  return ret;
}

/*
//to set a storage
const config = { key: 'value'};
    chrome.storage.local.set(config, () => {
    console.log('stored', config);
});

//to get from storage
chrome.storage.local.get(['key'], result => {
    const mykey = result.key;
    console.log(mykey);
});
*/