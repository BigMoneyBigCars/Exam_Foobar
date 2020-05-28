"use strict";
import "@babel/polyfill";

import { nav } from "./modules/nav.js";
import { fetchJson } from "./modules/fetchJson";
import { displayBeer, filterBeerArrays, checkBeerArray } from "./modules/products";
import { closeReceipt, updateReceipt } from "./modules/receipt";
import { receiptBut, payBut, receipt, popUp, popBut, url, updateUrl } from "./modules/consts";

import { bar, brew, checkout } from "./modules/nav";
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
  console.log(staticArray);
  console.log("tis ");
  constDataman();

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

  setTimeout(getUpdate, 1000);
}

function receiptEventlisterner() {
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

    document.querySelector(".receipt-container .submit").disabled = false;
  } else if (document.querySelector(".checkbox:checked") !== null) {
    console.log("false");
    document.querySelector("#receipt .submit").disabled = true;
  }
}
