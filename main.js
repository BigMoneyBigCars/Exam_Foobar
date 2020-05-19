"use strict";
import "@babel/polyfill";

import { nav } from "./modules/nav.js";

window.addEventListener("DOMContentLoaded", init);

const popBut = document.querySelector("#product-details");
const popUp = document.querySelector("#product-details");

const receipt = document.querySelector("#receipt");
const receiptBut = document.querySelector(".receipt-button");

//array
let orderArray = [];

function init() {
  console.log("tis ");
  popBut.addEventListener("click", () => {
    popUp.classList.toggle("active");
  });

  fetchJson();
}

async function fetchJson() {
  let response = await fetch("https://foobar-exam.herokuapp.com/beertypes");
  let jsonData = await response.json();
  filterData(jsonData);
}

function filterData(jsonData) {
  console.log(jsonData);

  jsonData.forEach(displayBeer);

  receiptEventlisterner();
}

function displayBeer(beer) {
  console.log(beer);
  let article = beer.name.trim().toLowerCase();
  console.log(article);

  let firstSpace = article.indexOf(" ");
  let firstName = article.substring(0, firstSpace);
  let lastSpace = article.lastIndexOf(" ");
  let lastName = article.substring(lastSpace + 1, article.length);
  let middleName = article.substring(firstSpace + 1, lastSpace);

  if (middleName == " ") {
    middleName = "";
  }
  article = firstName + middleName + lastName;

  const clone = document.querySelector("template").cloneNode(true).content;

  clone.querySelector("article").id = article;
  clone.querySelector("article").dataset.name = beer.name;
  clone.querySelector("article .desc-container").addEventListener("click", () => {
    showPopUp(beer);
  });

  clone.querySelector("h1").textContent = beer.name;
  clone.querySelector("p").textContent = "Alcohol " + beer.alc + "%";

  clone.querySelector(".count").dataset.count = "0";

  clone.querySelector(".fa-plus").addEventListener("click", () => {
    plusBeer(article);
  });
  clone.querySelector(".fa-minus").addEventListener("click", () => {
    minusBeer(article);
  });
  console.log(beer.label);
  clone.querySelector(".img").style.backgroundImage = "url('/imgs/" + [beer.label] + "')";
  document.querySelector("#container").appendChild(clone);
}

// plus / minus beer

function plusBeer(article) {
  let beerCounter;

  const element = document.querySelector("#" + [article]);
  const elementCount = element.querySelector(".count");
  const dataCount = element.querySelector(".count").dataset.count;

  beerCounter = dataCount;
  beerCounter++;

  element.querySelector(".count").dataset.count = beerCounter;

  elementCount.textContent = beerCounter;

  // console.log(element.querySelector(".count").dataset);
  addBeerArray(element.dataset.name, beerCounter);
}

function minusBeer(article) {
  let beerCounter;
  // console.log(beerCounter);
  const element = document.querySelector("#" + [article]);
  const elementCount = element.querySelector(".count");
  const dataCount = element.querySelector(".count").dataset.count;
  beerCounter = dataCount;
  //console.log(beerCounter);

  if (beerCounter > 0) {
    beerCounter--;
  }

  // console.log(beerCounter);
  element.querySelector(".count").dataset.count = beerCounter;
  elementCount.textContent = beerCounter;
  //console.log(element.querySelector(".count").dataset);

  removeBeerArray(element.dataset.name, beerCounter);
}

function addBeerArray(beer, amount) {
  //  orderArray[beer] = amount;
  const obj = {
    name: beer,
    amount: amount,
  };
  const exists = orderArray.find((x) => x.name === beer);
  console.log(exists);
  if (exists) {
    exists.amount = amount;
  } else {
    orderArray.push(obj);
  }

  console.log(orderArray);
  orderedItems();
}

let currentlist = [];
function removeBeerArray(beer, amount) {
  console.log(amount);

  const exists = orderArray.find((x) => x.name === beer);
  if (exists) {
    exists.amount = amount;
  }

  orderArray = orderArray.filter((x) => x.amount > 0);
  console.log(orderArray);
  /*   const index = orderArray.indexOf(beer);
  if (index > -1) {
    orderArray.splice(index, 1);
  } */

  orderedItems();
}

function orderedItems() {
  let count = 0;

  orderArray.forEach((obj) => {
    count += obj.amount;
  });
  // console.log(count);

  document.querySelector("#order .amount").textContent = "You are about to add " + [count] + " items";
}
// POPUP

function showPopUp(beer) {
  popUp.classList.toggle("active");

  popUp.querySelector("h1").textContent = beer.name;
  popUp.querySelector(".img").style.backgroundImage = "url('/imgs/" + [beer.label] + "')";
  popUp.querySelector(".type").textContent = beer.category;
  popUp.querySelector(".alc").textContent = beer.alc;

  popUp.querySelector(".impression p").textContent = beer.description.overallImpression;
  popUp.querySelector(".appearance p").textContent = beer.description.appearance;
  popUp.querySelector(".aroma p").textContent = beer.description.aroma;
  popUp.querySelector(".flavour p").textContent = beer.description.flavour;
  popUp.querySelector(".mouthfeel p").textContent = beer.description.mouthfeel;
}

//RECEIPT

function receiptEventlisterner() {
  console.log(receipt);
  receiptBut.addEventListener("click", () => {
    receipt.classList.toggle("active");
    updateReceipt();

    /*   receipt.addEventListener("animationend", () => {
      receipt.classList.toggle("active");
    }); */

    receipt.addEventListener("click", closeReceipt);
  });
}

function closeReceipt() {
  console.log(receipt);

  receipt.classList.remove("active");
}

function updateReceipt() {
  document.querySelector("#receipt .wrapper").innerHTML = "";

  orderArray.forEach((beer) => {
    const receiptTemp = document.querySelector(".receipt-temp").cloneNode(true).content;
    console.log(receiptTemp);

    receiptTemp.querySelector(".item").textContent = beer.name;
    receiptTemp.querySelector(".item-amount").textContent = beer.amount;
    document.querySelector("#receipt .wrapper").appendChild(receiptTemp);
  });
}
