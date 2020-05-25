"use strict";
import "@babel/polyfill";

import { nav } from "./modules/nav.js";
import { fetchJson } from "./modules/fetchJson";
import { displayBeer, filterBeerArrays } from "./modules/products";
import { closeReceipt, updateReceipt } from "./modules/receipt";
import { receiptBut, payBut, receipt, popUp, popBut, url, updateUrl } from "./modules/consts";
import { displayConfirmation } from "./modules/checkout";

import { bar, brew, checkout } from "./modules/nav";
//import { login } from "./modules/login";
import { printKegs, updateAll, updatedArray } from "./modules/theBar/bottom";

window.addEventListener("DOMContentLoaded", init);

export let staticArray = [];
export let updatedCheckArray = [];

//array

function init() {
  console.log(staticArray);
  console.log("tis ");
  popBut.addEventListener("click", () => {
    popUp.classList.toggle("active");
  });
  brew.style.display = "none";
  checkout.style.display = "none";
  bar.style.display = "block";
  fetchJson(url, fetchStaticArray);
  //fetchJson(updateUrl, printKegs);

  // setTimeout(updateDashboard, 20);
}

function fetchStaticArray(jsonData) {
  staticArray = jsonData;
  console.log(staticArray);
  fetchJson(updateUrl, fetchUpdateArray);
}
function fetchUpdateArray(jsonData) {
  updatedCheckArray = jsonData;
  collectBothArrays();
}
function collectBothArrays() {
  console.log(updatedCheckArray);
  console.log(staticArray);
  updateDashboard();
}

function updateDashboard() {
  printKegs(updatedCheckArray);
  filterData();
}

function filterData() {
  console.log("filterData");
  console.log(staticArray);

  filterBeerArrays(staticArray, updatedCheckArray);

  receiptEventlisterner();
}

function receiptEventlisterner() {
  payBut.addEventListener("click", displayConfirmation);
  console.log(receipt);
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
