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

    //   console.log(clone.querySelector(".round"));

    clone.querySelector(".round").style.strokeDasharray = dash + "," + 999;

    const parent = bottom;

    parent.appendChild(clone);
  });
}
export function updateAll(data) {
  console.log(data);
  updateBottom(data);
  updateRight(data);
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

  let queueTime = queue.length * 40;
  let servingTime = serving.length * 30;
  document.querySelector(".sbRight .theQueue").textContent = queue.length;
  document.querySelector(".sbRight .serving").textContent = serving.length;
  document.querySelector(".sbRight .time").textContent = ((queueTime + servingTime) / 60).toFixed(0) + "min";
}
