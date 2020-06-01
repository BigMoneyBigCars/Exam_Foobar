"use strict";
import "@babel/polyfill";

import { nav, bar, brew, order, topLabel } from "./modules/nav.js";
import { fetchJson } from "./modules/fetchJson";
import { orderArray, resetOrderArray } from "./modules/addRemoveBeer";
import { displayBeer, filterBeerArrays, checkBeerArray, beerCounter } from "./modules/products";
import { closeReceipt, updateReceipt } from "./modules/receipt";
import { receiptBut, payBut, receipt, popUp, popBut, url, updateUrl } from "./modules/consts";
import { addToOrder } from "./modules/products";
//import { login } from "./modules/login";
import { printKegs, updateAllDashboard, updatedArray } from "./modules/theBar/bottom";

import { login, constDataman } from "./modules/login";

/* let url = "https://foobar-exam.herokuapp.com/beertypes";
let updateUrl = "https://foobar-exam.herokuapp.com"; */

window.addEventListener("DOMContentLoaded", init);

export let staticArray = [];
export let updatedCheckArray = [];

//array

function init() {
  console.log(beerCounter, "BEER COUNTE RHER");
  console.log(staticArray);
  console.log("tis ");
  constDataman();

  document.querySelector("#product-details > img.close").addEventListener("click", () => {
    console.log("close this");
    popUp.classList.toggle("active");
  });
  popBut.addEventListener("click", () => {
    popUp.classList.toggle("active");
  });
  brew.style.display = "none";
  checkout.style.display = "none";
  bar.style.display = "grid";
  fetchJson(url, fetchStaticArray);
  //fetchJson(updateUrl, printKegs);

  // setTimeout(updateDashboard, 20);
}
//gets First Json   /beertypes
function fetchStaticArray(jsonData) {
  staticArray = jsonData;
  console.log(staticArray);
  fetchJson(updateUrl, fetchUpdateArray);
}

//get Second Json
function fetchUpdateArray(jsonData) {
  updatedCheckArray = jsonData;
  collectBothArrays();
}

// check having both arrays at same time
function collectBothArrays() {
  console.log(updatedCheckArray);
  console.log(staticArray);
  filterData();
}

// ??? skkal nok ikke bruges
function updateDashboard() {
  printKegs(updatedCheckArray);
  filterData();
}

// Første funktion som sætter en tomt dashboard og printer øllene ind i avaliable/not avaliable.
function filterData() {
  console.log("filterData");

  printKegs(updatedCheckArray);
  filterBeerArrays(staticArray, updatedCheckArray);
  receiptEventlisterner();

  setTimeout(getUpdate, 1000);
}

function getUpdate() {
  updatedCheckArray = [];
  fetchJson(updateUrl, delegateUpdates);
}

function delegateUpdates(jsonData) {
  updatedCheckArray = jsonData;
  console.log(staticArray, updatedCheckArray);

  checkBeerArray(updatedCheckArray);

  //updates the Dashboard
  updateAllDashboard(updatedCheckArray);

  setTimeout(getUpdate, 4000);
}

function receiptEventlisterner() {
  console.log(receipt);
  //document.querySelector("#paymentform button").disabled = true;
  let payInput = document.querySelectorAll("#paymentform input");
  // console.log(payInput);
  payInput.forEach((e) => {
    e.addEventListener("input", () => {
      console.log(e, "her er jeg ");

      document.querySelector("#paymentform button").disabled = false;
    });
    // console.log(e);
  });

  document.querySelector("button#paynow").disabled = true;
  let logoReturn = document.querySelectorAll("img.logo");
  logoReturn.forEach((logo) => {
    logo.addEventListener("click", () => {
      bar.style.display = "block";
      brew.style.display = "none";
      order.style.display = "none";

      topLabel.textContent = "The Bar";
      document.querySelector("article#receipt").classList.remove("active");
    });
  });
  addToOrder.addEventListener("click", () => {
    document.querySelector("#toggle").checked = false;
    document.querySelector("#receipt >div > button").disabled = true;
  });
  receiptBut.addEventListener("click", () => {
    receipt.classList.add("active");
    updateReceipt();

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

export function resetAll() {
  console.log(orderArray, "HER ");
  console.log("RESET ALLL");
  console.log(orderArray);

  console.log(beerCounter);
  let beerCounter = 0;
  console.log(beerCounter);
  resetOrderArray();
  //orderedItems();
  updateReceipt();

  let things = document.querySelectorAll("p.count");
  document.querySelector("#order > div").textContent = "Your basket is empty.";
  document.querySelector("#toggle").checked = false;
  document.querySelector("#receipt > div > button").disabled = true;
  document.querySelector("#order > button").disabled = true;

  console.log(things);
  things.forEach((e) => {
    console.log(e);
    e.dataset.count = 0;
    e.textContent = 0;
  });
}
