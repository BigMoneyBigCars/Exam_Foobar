import { staticArray, updatedCheckArray } from "../../main";
import { bar } from "../nav";

const bottom = document.querySelector("#theBar .sbBottom");
export let printArray = [];
export let updatedArray = [];
export let kegArray = [];
export let servingArray = [];
setInterval(() => {
  const now = new Date().getTime();
  printArray.forEach((item, index) => {
    if (item.time + 20000 < now) {
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
  // console.log(updatedArray);

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

  // console.log(formattedTime);
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

  bartenderWorks(data[2], dannie);
  bartenderWorks(data[0], peter);
  bartenderWorks(data[1], jonas);

  //  dannie.querySelector(".status").textContent = data[2].status;
}

/* let danniesCounter;
let danniesCount = 0;
let dannieAnimationRunning = false; */

function bartenderWorks(data, bartender) {
  //console.log(bartender);
  // console.log(data);

  let orderLength;

  if (data) {
    const findOrder = servingArray.find(({ id }) => id === data.servingCustomer);
    //  dannie.querySelector("#dannie .makingOrder p").textContent = "Preparing order";
    if (data.servingCustomer != null) {
      if (!bartender.dataset.beersleft) {
        bartender.dataset.beersleft = findOrder.order.length;
        bartender.dataset.total = findOrder.order.length;

        bartender.querySelector(".tracker p + p").textContent = "/ " + findOrder.order.length + ")";
      }
      bartender.querySelector(".makingOrder p ").textContent = "Nr. " + data.servingCustomer;
    } else {
      bartender.querySelector(" .makingOrder p ").textContent = "";
    }
    if (findOrder) {
      let order = findOrder.order;
      //   console.log(order);
      orderLength = order.length;
      // console.log(orderLength);

      //danTracker.querySelector("p").textContent = 0;
      bartender.querySelector(".theOrder > h2").textContent = "Order Items (" + order.length + ")";
      //  danTracker.querySelector("p+p").textContent = "/" + order.length;
      bartender.querySelector(".theOrder .contain").innerHTML = "";
      order.forEach((item) => {
        ///  console.log(item);
        let clone = bartender.querySelector(".items-in-order").cloneNode(true).content;
        clone.querySelector(".beer").textContent = item;

        let parent = bartender.querySelector(".theOrder .contain");
        parent.appendChild(clone);
      });
    }
  }

  //  console.log(data);
  // dannie.querySelector(".status").textContent = "Bartender is currently " + data.status;

  // dannie.querySelector(".statusDetail").textContent = data.statusDetail;

  if (data.statusDetail === "releaseTap") {
    //  console.log(data.statusDetail);
    bartender.dataset.beersleft = bartender.dataset.beersleft - 1;
    bartender.querySelector(".tracker p").textContent = "(" + (bartender.dataset.total - bartender.dataset.beersleft);

    //bartender.querySelector(".tracker p").textContent = bartender.dataset.beersleft;
    bartender.dataset.count = 0;
    clearInterval(bartender.dataset.counter);
    bartender.dataset.animationrunning = false;

    bartender.querySelector(".tap").textContent = "releasing tap";
  } else if (data.statusDetail === "pourBeer") {
    // console.log(data.statusDetail);
    let existss = kegArray.find(({ id }) => id === data.usingTap);
    if (existss) {
      let beerBeingServed = existss.beer;
      // console.log(beerBeingServed);
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

  // console.log(data);
}

function checkIfOrderExists(orderNr) {
  // console.log(orderNr);
  const date = new Date();
  const orderItemNr = {
    time: date.getTime(),
    id: orderNr,
  };

  if (!printArray.some((e) => e.id === orderItemNr.id)) {
    printArray.push(orderItemNr);
    printOrder(orderItemNr.id);
  }

  // console.log(printArray);
}

function printOrder(orderNr) {
  let clonePrint = document.querySelector(".printOrderTemp").cloneNode(true).content;
  clonePrint.querySelector("h2").id = orderNr;
  clonePrint.querySelector("h2").textContent = orderNr;
  clonePrint.querySelector("h2").dataset.id = orderNr;

  const parentPrint = document.querySelector(".printContainer");

  parentPrint.appendChild(clonePrint);

  // console.log(printArray);
  // console.log(orderNr);
}

function tissemand(e) {
  console.log(e);

  e.remove();
  console.log(e);
}

function deleteSelf(elementDelete) {
  console.log(elementDelete);
  /*  console.log(orderNr);
  const container = document.querySelector(".printContainer");
  console.log(container);
  let orders = document.querySelectorAll(".printContainer h2");
  console.log(orders); */

  /*   orders.forEach((e) => {
    console.log(e.dataset.id);
    console.log(orderNr);
    if (e.dataset.id === orderNr) {
      console.log("DET ER KUN DENNE ORDRE SOME FINDES ", orderNr);
      //  e.removeElement();
    }
  }); */
  /* 
  console.log(printArray);
  let existPrint = printArray.find((id) => id === orderNr);
  if (existPrint) {
    console.log("it exists");
    console.log(existPrint); */
  /*   orders.forEach((orderE) => {
      console.log(orderE, existPrint);
      if (orderE.dataset.id == existPrint) {
        orderE.textContent = "DELETE ME";
      }
    }); */

  //   console.log(document.querySelector(".printContainer h2").dataset.id === existPrint);
  /*   } else {
    console.log("it does not exists");
  }
 */
  // console.log(orders);
}
/*   console.log(orderNr);

  let clonePrint = document.querySelector(".printOrderTemp").cloneNode(true).content;
  clonePrint.querySelector("h2").textContent = orderNr;
  clonePrint.querySelector("h2").dataset.id = orderNr;

  const parentPrint = document.querySelector(".printContainer");

  parentPrint.appendChild(clonePrint); */
//  clonePrint.querySelector("h2").dataset.active = "active";

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
