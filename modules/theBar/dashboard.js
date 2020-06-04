import { staticArray, updatedCheckArray } from "../../main";
import { bar } from "../nav";

const bottom = document.querySelector("#theBar .sbBottom .bottom-container");
export let printArray = [];
export let updatedArray = [];
export let kegArray = [];
export let servingArray = [];
setInterval(() => {
  const now = new Date().getTime();
  printArray.forEach((item, index) => {
    if (item.time + 50000 < now) {
      console.log(item.id, "tiem to delete");
      document.getElementById(item.id).remove();
      printArray.splice(index, 1);
      console.log(printArray);
    }
  });
}, 1000);
export function printKegs(data) {
  data = data.taps;
  updatedArray = data;

  let percent = 30;
  let dash = percent * 2.5;
  data.forEach((element) => {
    const clone = document.querySelector(".bottom-bar").cloneNode(true).content;

    clone.querySelector(".round").style.strokeDasharray = dash + "," + 999;
    const parent = bottom;
    parent.appendChild(clone);
  });
}

export function updateAllDashboard(data) {
  servingArray = data.serving;

  updateBottom(data);
  updateRight(data);
  updateLeft(data.timestamp);
  updateBartenders(data.bartenders);
}
function updateLeft(time) {
  let timestamp = updatedCheckArray.timestamp;
  let unix_timestamp = timestamp;

  var date = new Date(unix_timestamp);

  var hours = date.getHours();

  var minutes = "0" + date.getMinutes();

  var seconds = "0" + date.getSeconds();

  var formattedTime = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  document.querySelector(".time").textContent = formattedTime;
}

function updateBottom(data) {
  data = data.taps;
  kegArray = data;
  console.log(data);
  updatedArray = data;

  let count = -1;
  let bottomBarsParent = document.querySelectorAll(".point");
  let bottomBars = document.querySelectorAll(".round .circle");

  data.forEach((element) => {
    count++;

    let capacity = element.capacity;
    let level = element.level;

    let percent = (level / capacity) * 100;
    let dash = percent * 2.5;

    bottomBars[count].style.strokeDasharray = percent + "," + 999;
    bottomBarsParent[count].querySelector(".percentage").textContent = percent.toFixed(0) + "%";
    bottomBarsParent[count].querySelector("h2").textContent = element.beer;
  });
}

function updateRight(data) {
  let queue = data.queue;
  let serving = data.serving;
  let time = data.timestamp;

  let queueTime = queue.length * 60;
  let servingTime = serving.length * 30;
  let waitTime = ((queueTime + servingTime) / 60).toFixed(0);

  document.querySelector(".sbRight .theQueue").textContent = queue.length;

  document.querySelector(".sbRight .serving").textContent = serving.length;
  document.querySelector(".sbRight .time").textContent = waitTime + " min";
  document.querySelector("#confirmation > div > div > p.theWaitTime").textContent = waitTime + " min";
}

function updateBartenders(data) {
  const dannie = document.querySelector("#dannie");
  const peter = document.querySelector("#peter");
  const jonas = document.querySelector("#jonas");

  bartenderWorks(data[2], dannie);
  bartenderWorks(data[0], peter);
  bartenderWorks(data[1], jonas);
}

function bartenderWorks(data, bartender) {
  let orderLength;

  if (data) {
    const findOrder = servingArray.find(({ id }) => id === data.servingCustomer);
    if (data.servingCustomer != null) {
      if (!bartender.dataset.beersleft) {
        bartender.dataset.beersleft = findOrder.order.length;
        bartender.dataset.total = findOrder.order.length;

        bartender.querySelector(".tracker p + p").textContent = "/ " + findOrder.order.length + ")";
      }
      bartender.querySelector(".makingOrder p ").textContent = "No. " + data.servingCustomer;
    } else {
      bartender.querySelector(" .makingOrder p ").textContent = "";
    }
    if (findOrder) {
      let order = findOrder.order;

      orderLength = order.length;

      bartender.querySelector(".theOrder > .con > h2").textContent = "Order Items (" + order.length + ")";

      bartender.querySelector(".theOrder .contain").innerHTML = "";
      order.forEach((item) => {
        let clone = bartender.querySelector(".items-in-order").cloneNode(true).content;
        clone.querySelector(".beer").textContent = item;

        let parent = bartender.querySelector(".theOrder .contain");
        parent.appendChild(clone);
      });
    }
  }

  if (data.statusDetail === "releaseTap") {
    bartender.dataset.beersleft = bartender.dataset.beersleft - 1;
    bartender.querySelector(".tracker p").textContent = "(" + (bartender.dataset.total - bartender.dataset.beersleft);

    bartender.dataset.count = 0;
    clearInterval(bartender.dataset.counter);
    bartender.dataset.animationrunning = false;

    bartender.querySelector(".tap").textContent = "releasing tap";
  } else if (data.statusDetail === "pourBeer") {
    let existss = kegArray.find(({ id }) => id === data.usingTap);
    if (existss) {
      let beerBeingServed = existss.beer;

      bartender.querySelector(".usingTap .con .tap").textContent = "Pouring beer on tap " + (data.usingTap + 1);
      bartender.querySelector(".usingTap .contain p").textContent = beerBeingServed;
      bartender.querySelector(".cont p").classList.add("loader");

      if (bartender.dataset.animationrunning == "false") {
        bartender.dataset.animationrunning = true;
        bartender.dataset.counter = setInterval(function () {
          if (bartender.dataset.count < 101) {
            bartender.querySelector("div.usingTap > div.contain > div > p:nth-child(2)").textContent = bartender.dataset.count + "%";
            bartender.dataset.count++;
          } else {
            clearInterval(bartender.dataset.counter);
            bartender.dataset.animationrunning = false;
          }
        }, 95);
      }
    }
  } else if (data.statusDetail === "receivePayment") {
    bartender.querySelector(".usingTap .con .tap").textContent = "Finishing order";
    bartender.querySelector(".usingTap .contain p").textContent = "Order Complete";

    bartender.querySelector(".cont p").classList.remove("loader");
    bartender.querySelector(".usingTap .contain p").classList.add("completed");
    checkIfOrderExists(data.servingCustomer);
    bartender.querySelector(".usingTap .cont p").textContent = "";
    bartender.querySelector(".usingTap .cont p + p").textContent = "";

    bartender.removeAttribute("data-beersleft");
  } else if (data.statusDetail === "reserveTap") {
    bartender.querySelector(".usingTap .con .tap").textContent = "Waiting on a tap";
  } else if (data.statusDetail === "replaceKeg") {
    console.log(data.statusDetail);
    bartender.querySelector(".usingTap .con .tap").textContent = "Replacing a keg";
    bartender.querySelector(".theOrder .contain").innerHTML = "";
    bartender.querySelector(".makingOrder p").textContent = "";
    bartender.querySelector(".usingTap .contain p").textContent = "";
  } else if (data.statusDetail === "waiting") {
    bartender.querySelector(".usingTap .con .tap").textContent = "Ready for new order";
    bartender.querySelector(".usingTap .contain p").textContent = "";
    bartender.querySelector(".usingTap .contain p").classList.remove("completed");
    bartender.querySelector(".usingTap .contain p").textContent = "";
    bartender.querySelector(".usingTap .con .tap").textContent = "Next order";
    bartender.querySelector(".theOrder .contain").innerHTML = "";
    bartender.querySelector(".makingOrder p").textContent = "";
  } else if (data.statusDetail === "startServing") {
    bartender.querySelector(".tracker p").textContent = "(0";
    bartender.querySelector(".usingTap .contain p").classList.remove("completed");
    bartender.querySelector(".usingTap .contain p").textContent = "";
    bartender.querySelector(".usingTap .con .tap").textContent = "Next order";
    bartender.querySelector(".theOrder .contain").innerHTML = "";
    bartender.querySelector(".makingOrder p").textContent = "";
  } else {
    bartender.querySelector(".usingTap .contain p").textContent = "";
    bartender.querySelector(".usingTap .con .tap").textContent = "";
    bartender.querySelector(".usingTap .contain p").classList.remove("completed");
  }
}

function checkIfOrderExists(orderNr) {
  const date = new Date();
  const orderItemNr = {
    time: date.getTime(),
    id: orderNr,
  };

  if (!printArray.some((e) => e.id === orderItemNr.id)) {
    printArray.push(orderItemNr);
    printOrder(orderItemNr.id);
  }
}

function printOrder(orderNr) {
  let clonePrint = document.querySelector(".printOrderTemp").cloneNode(true).content;
  clonePrint.querySelector("h2").id = orderNr;
  clonePrint.querySelector("h2").textContent = orderNr;
  clonePrint.querySelector("h2").dataset.id = orderNr;

  const parentPrint = document.querySelector(".printContainer");

  parentPrint.appendChild(clonePrint);
}
