import { staticArray, updatedCheckArray } from "../../main";

const bottom = document.querySelector("#theBar .sbBottom");

export let updatedArray = [];
export function printKegs(data) {
  data = data.taps;
  updatedArray = data;
  console.log(updatedArray);

  let percent = 30;
  let dash = percent * 2.5;
  data.forEach((element) => {
    const clone = document.querySelector(".bottom-bar").cloneNode(true).content;
    clone.querySelector("p").textContent = percent.toFixed(0);
    clone.querySelector(".round").style.strokeDasharray = dash + "," + 999;
    const parent = bottom;
    parent.appendChild(clone);
  });
}

export function updateAllDashboard(data) {
  console.log(data);
  updateBottom(data);
  updateRight(data);
  updateLeft(data.timestamp);
}
function updateLeft(time) {
  let timestamp = updatedCheckArray.timestamp;
  let unix_timestamp = timestamp;
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(unix_timestamp);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  var formattedTime = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  console.log(formattedTime);
  document.querySelector(".time").textContent = formattedTime;
}

function updateBottom(data) {
  data = data.taps;
  updatedArray = data;
  console.log(updatedArray);
  // console.log(data);
  let count = -1;
  let bottomBarsParent = document.querySelectorAll(".point");
  let bottomBars = document.querySelectorAll(".round");
  data.forEach((element) => {
    count++;
    // console.log(element);
    //console.log(bottomBars[0]);
    let capacity = element.capacity;
    let level = element.level;

    let percent = (level / capacity) * 100;
    let dash = percent * 2.5;

    bottomBars[count].style.strokeDasharray = dash + "," + 999;
    bottomBarsParent[count].querySelector("p").textContent = percent.toFixed(0);
    bottomBarsParent[count].querySelector("h2").textContent = element.beer;
  });

  //console.log("tisssss");
}

function updateRight(data) {
  let queue = data.queue;
  let serving = data.serving;
  let time = data.timestamp;
  // console.log(queue);
  //console.log(serving);
  //console.log(time);
  let queueTime = queue.length * 60;
  let servingTime = serving.length * 30;
  let waitTime = ((queueTime + servingTime) / 60).toFixed(0);

  console.log(waitTime);
  document.querySelector(".sbRight .theQueue").textContent = queue.length;

  document.querySelector(".sbRight .serving").textContent = serving.length;
  document.querySelector(".sbRight .time").textContent = waitTime + " min";
  document.querySelector("#confirmation > div > .theWaitTime").textContent = waitTime + " min";
}
