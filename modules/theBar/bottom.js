import { staticArray, updatedCheckArray } from "../../main";

const bottom = document.querySelector("#theBar .sbBottom");

export let updatedArray = [];
export let kegArray = [];
export let servingArray = [];
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
  servingArray = data.serving;
  //  console.log(servingArray);
  //console.log(data);
  updateBottom(data);
  updateRight(data);
  updateLeft(data.timestamp);
  updateBartenders(data.bartenders);
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
  kegArray = data;

  updatedArray = data;
  // console.log(updatedArray);
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
    bottomBarsParent[count].querySelector("p").textContent = percent.toFixed(0) + "%";
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

  // console.log(waitTime);
  document.querySelector(".sbRight .theQueue").textContent = queue.length;

  document.querySelector(".sbRight .serving").textContent = serving.length;
  document.querySelector(".sbRight .time").textContent = waitTime + " min";
  document.querySelector("#confirmation > div > div > p.theWaitTime").textContent = waitTime + " min";
}

function updateBartenders(data) {
  //console.log(kegArray);
  //peterB(data[0]);
  // jonasB(data[1]);
  const dannie = document.querySelector("#dannie");
  const peter = document.querySelector("#peter");
  const jonas = document.querySelector("#jonas");

  dannieB(data[2], dannie);

  //  dannie.querySelector(".status").textContent = data[2].status;
}

/* let danniesCounter;
let danniesCount = 0;
let dannieAnimationRunning = false; */

function dannieB(data, bartender) {
  console.log(data);

  let orderLength;

  if (data) {
    const findOrder = servingArray.find(({ id }) => id === data.servingCustomer);
    //  dannie.querySelector("#dannie .makingOrder p").textContent = "Preparing order";
    if (data.servingCustomer != null) {
      if (!dannie.dataset.beersleft) {
        dannie.dataset.beersleft = findOrder.order.length;
        dannie.querySelector("p.tracker").textContent = findOrder.order.length;
      }
      dannie.querySelector("#dannie .makingOrder p ").textContent = "Nr. " + data.servingCustomer;
    } else {
      dannie.querySelector("#dannie .makingOrder p ").textContent = "";
    }
    if (findOrder) {
      let order = findOrder.order;
      console.log(order);
      orderLength = order.length;
      console.log(orderLength);

      //danTracker.querySelector("p").textContent = 0;
      dannie.querySelector(".theOrder > h2").textContent = "Order Items (" + order.length + ")";
      //  danTracker.querySelector("p+p").textContent = "/" + order.length;
      dannie.querySelector(".theOrder .contain").innerHTML = "";
      order.forEach((item) => {
        console.log(item);
        const clone = document.querySelector(".items-in-order").cloneNode(true).content;
        clone.querySelector(".beer").textContent = item;

        const parent = document.querySelector(".theOrder .contain");
        parent.appendChild(clone);
      });
    }
  }

  console.log(data);
  // dannie.querySelector(".status").textContent = "Bartender is currently " + data.status;

  // dannie.querySelector(".statusDetail").textContent = data.statusDetail;

  if (data.statusDetail === "releaseTap") {
    console.log(data.statusDetail);
    dannie.dataset.beersleft = dannie.dataset.beersleft - 1;
    dannie.dataset.count = 0;
    clearInterval(dannie.dataset.counter);
    dannie.dataset.animationrunning = false;

    dannie.querySelector(" #dannie .tap").textContent = "releasing tap";
  } else if (data.statusDetail === "replaceKeg") {
    console.log(data.statusDetail);
    dannie.querySelector("#dannie .tap").textContent = "Replacing a keg";
  } else if (data.statusDetail === "pourBeer") {
    console.log(data.statusDetail);
    let existss = kegArray.find(({ id }) => id === data.usingTap);
    if (existss) {
      let beerBeingServed = existss.beer;
      console.log(beerBeingServed);
      dannie.querySelector("#dannie .usingTap .con .tap").textContent = "Pouring beer on tap " + (data.usingTap + 1);
      dannie.querySelector("#dannie .usingTap .contain p").textContent = beerBeingServed;
      dannie.querySelector("#dannie .cont p").classList.add("loader");

      if (dannie.dataset.animationrunning == "false") {
        dannie.dataset.animationrunning = true;
        dannie.dataset.counter = setInterval(function () {
          if (dannie.dataset.count < 101) {
            document.querySelector("#dannie > div.usingTap > div.contain > div > p:nth-child(2)").textContent = dannie.dataset.count + "%";
            dannie.dataset.count++;
          } else {
            clearInterval(dannie.dataset.counter);
            dannie.dataset.animationrunning = false;
          }
        }, 100);
      }
    }
  } else if (data.statusDetail === "receivePayment") {
    dannie.removeAttribute("data-beersleft");
  } else {
    dannie.querySelector("#dannie .usingTap .contain p").textContent = "";
    dannie.querySelector("#dannie .usingTap .con .tap").textContent = "";
    dannie.querySelector("#dannie .cont p").classList.remove("loader");
  }

  console.log(data);
}

/* 
function trackerTime(danOrderTracker) {
  console.log(danOrderTracker);
  console.log(danOrderTracker.length, danTrackerVar);

  if (danTrackerVar < danOrderTracker.length) {
    setTimeout(() => {
      danTrackerVar++;
      document.querySelector("#dannie .tracker p ").textContent = danTrackerVar;
      trackerTime();
    }, 500);
  }
} */

function jonasB(data) {
  // console.log(data);
}
function peterB(data) {
  //console.log(data);
}

function testss() {
  var count = 0;
  var counting = setInterval(function () {
    if (count < 101) {
      document.querySelector(".cont p + p").textContent = count + "%";
      count++;
    } else {
      clearInterval(counting);
    }
  }, 100);
}
