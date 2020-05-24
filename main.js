"use strict";
import "@babel/polyfill";

import { nav } from "./modules/nav.js";
import { fetchJson } from "./modules/fetchJson";
import { displayBeer } from "./modules/products";
import { closeReceipt } from "./modules/receipt";
import { updateReceipt } from "./modules/receipt";

import { popBut } from "./modules/consts";
import { popUp } from "./modules/consts";
import { receiptBut } from "./modules/consts";
import { receipt } from "./modules/consts";

let url = "https://foobar-exam.herokuapp.com/beertypes";
let updateUrl = "https://foobar-exam.herokuapp.com";

window.addEventListener("DOMContentLoaded", init);

//array

function init() {
  console.log("tis ");
  popBut.addEventListener("click", () => {
    popUp.classList.toggle("active");
  });
  fetchJson(url, filterData);
}

function filterData(jsonData) {
  jsonData.forEach(displayBeer);

  receiptEventlisterner();
}
/* 
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
} */

// plus / minus beer

/* function addBeerArray(beer, amount) {
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

function removeBeerArray(beer, amount) {
  console.log(amount);

  const exists = orderArray.find((x) => x.name === beer);
  if (exists) {
    exists.amount = amount;
  }

  orderArray = orderArray.filter((x) => x.amount > 0);
  console.log(orderArray);

  orderedItems();
}

function orderedItems() {
  let count = 0;

  orderArray.forEach((obj) => {
    count += obj.amount;
  });

  document.querySelector("#order .amount").textContent = "You are about to add " + [count] + " items";
} */
// POPUP
/* 
function showPopUp(beer) {
  popUp.classList.toggle("active");
  console.log(beer);
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
 */
//RECEIPT

function receiptEventlisterner() {
  console.log(receipt);
  receiptBut.addEventListener("click", () => {
    receipt.classList.add("active");
    updateReceipt();

    /*   receipt.addEventListener("animationend", () => {
      receipt.classList.toggle("active");
    }); */

    receipt.addEventListener("click", () => {});
    document.querySelector("#receipt .edit").addEventListener("click", closeReceipt);
  });
  document.querySelector("#receipt .switch").addEventListener("click", checkTrue);
}

function checkTrue() {
  const input = document.querySelector("#receipt .checkbox");

  if (document.querySelector(".checkbox:checked") === null) {
    console.log("true");

    document.querySelector("#receipt .submit").disabled = false;
  } else if (document.querySelector(".checkbox:checked") !== null) {
    console.log("false");
    document.querySelector("#receipt .submit").disabled = true;
  }
}
