import { addBeerArray, orderArray } from "./addRemoveBeer";
import { removeBeerArray } from "./addRemoveBeer";
import { showPopUp } from "./showPopUp";
import { updatedArray } from "./theBar/dashboard";
import { fetchJson } from "./fetchJson";
import { updateUrl, url } from "./consts";
import { staticArray, updatedCheckArray } from "main";
export let addToOrder = document.querySelector("#order > button");
let notAvaliable = [];
let Avaliable = [];
export let beerCounter = 0;

export function checkBeerArray(updatedCheckArray) {
  let check = updatedCheckArray.taps;
  //console.log(notAvaliable, check);

  notAvaliable.forEach((e) => {
    const exists = notAvaliable.find((x) => x.name === check.beer);

    if (exists) {
      //   console.log(e.name + " TIME FOR UPDATE");
    } else {
      // console.log(e.name + " everythings fine");
    }
  });
}

export function filterBeerArrays(staticArray, updatedCheckArray) {
  notAvaliable = [];
  Avaliable = [];
  addToOrder.disabled = true;

  console.log(staticArray, updatedCheckArray);

  updatedCheckArray = updatedCheckArray.taps;
  console.log(updatedCheckArray);

  staticArray.forEach((e) => {
    const exists = updatedCheckArray.find((x) => x.beer === e.name);

    if (exists) {
      // console.log(e.name + " does exist");
      Avaliable.push(e);
    } else {
      // console.log(e.name + " does NOT exist");
      notAvaliable.push(e);
    }
  });

  console.log(notAvaliable);
  console.log(Avaliable);

  document.querySelector("#notAvaliable > .container").innerHTML = "";
  document.querySelector("#avaliable > .container").innerHTML = "";
  Avaliable.forEach(displayAvaliable);
  notAvaliable.forEach(displayNotAvaliable);
}

function displayAvaliable(beer) {
  const clone = document.querySelector("template.avaliable").cloneNode(true).content;
  const parent = document.querySelector("#avaliable > .container");

  let article = beer.name.trim().toLowerCase();

  let firstSpace = article.indexOf(" ");
  let firstName = article.substring(0, firstSpace);
  let lastSpace = article.lastIndexOf(" ");
  let lastName = article.substring(lastSpace + 1, article.length);
  let middleName = article.substring(firstSpace + 1, lastSpace);
  if (middleName == " ") {
    middleName = "";
  }
  article = firstName + middleName + lastName;

  clone.querySelector("article").id = article;
  clone.querySelector("article").dataset.name = beer.name;
  clone.querySelector("article .product").addEventListener("click", () => {
    showPopUp(beer);
  });
  clone.querySelector("h1").textContent = beer.name;
  clone.querySelector("p").textContent = "Alcohol " + beer.alc + "%";

  clone.querySelector(".count").dataset.count = "0";

  clone.querySelector(".plus").src = "/icons/multiply.png";
  clone.querySelector(".plus").addEventListener("click", (e) => {
    plusBeer(article);
  });
  clone.querySelector(".minus").src = "/icons/subtract.png";
  clone.querySelector(".minus").addEventListener("click", () => {
    minusBeer(article);
  });

  clone.querySelector("img").src = "imgs/" + beer.label;
  parent.appendChild(clone);
  animate();
}

function displayNotAvaliable(beer) {
  const clone = document.querySelector("template.notAvaliable").cloneNode(true).content;
  const parent = document.querySelector("#notAvaliable > .container");

  let article = beer.name.trim().toLowerCase();

  let firstSpace = article.indexOf(" ");
  let firstName = article.substring(0, firstSpace);
  let lastSpace = article.lastIndexOf(" ");
  let lastName = article.substring(lastSpace + 1, article.length);
  let middleName = article.substring(firstSpace + 1, lastSpace);
  if (middleName == " ") {
    middleName = "";
  }
  article = firstName + middleName + lastName;

  clone.querySelector("article").id = article;
  clone.querySelector("article").dataset.name = beer.name;
  clone.querySelector("article .desc-container").addEventListener("click", () => {
    showPopUp(beer);
  });
  clone.querySelector("h1").textContent = beer.name;
  clone.querySelector("p").textContent = "Alcohol " + beer.alc + "%";
  clone.querySelector(".count").textContent = "Unavaliable";
  clone.querySelector("img").src = "imgs/" + beer.label;
  parent.appendChild(clone);
}

function animate() {
  console.log("anaaaaa");

  let plus = document.querySelectorAll(".counter");
  plus.forEach((e) => {
    let m = e.querySelector(".minus");
    let p = e.querySelector(".plus");
    p.addEventListener("click", () => {
      p.style.transform = "scale(1.2)";

      p.addEventListener("transitionend", () => {
        p.style.transform = "scale(1)";
      });
    });

    m.addEventListener("click", () => {
      m.style.transform = "scale(1.2)";
      m.addEventListener("transitionend", () => {
        m.style.transform = "scale(1)";
      });
    });
  });
}

function plusBeer(article) {
  let beerCounter;

  const element = document.querySelector("#" + [article]);
  const elementCount = element.querySelector(".count");
  const dataCount = element.querySelector(".count").dataset.count;

  beerCounter = dataCount;
  beerCounter++;

  element.querySelector(".count").dataset.count = beerCounter;
  elementCount.textContent = beerCounter;
  addBeerArray(element.dataset.name, beerCounter);
}

function minusBeer(article) {
  let beerCounter;
  const element = document.querySelector("#" + [article]);
  const elementCount = element.querySelector(".count");
  const dataCount = element.querySelector(".count").dataset.count;
  beerCounter = dataCount;

  if (beerCounter > 0) {
    beerCounter--;
  }
  element.querySelector(".count").dataset.count = beerCounter;
  elementCount.textContent = beerCounter;
  removeBeerArray(element.dataset.name, beerCounter);
}
