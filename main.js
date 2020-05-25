"use strict";
import "@babel/polyfill";

import { nav } from "./modules/nav.js";
import { fetchJson } from "./modules/fetchJson";
import { displayBeer } from "./modules/products";
import { closeReceipt, updateReceipt } from "./modules/receipt";
import { receiptBut, payBut, receipt, popUp, popBut } from "./modules/consts";
import { displayConfirmation } from "./modules/checkout";

import { bar, brew, checkout } from "./modules/nav";
//import { login } from "./modules/login";
import { printKegs, updateAll } from "./modules/theBar/bottom";

let url = "https://foobar-exam.herokuapp.com/beertypes";
let updateUrl = "https://foobar-exam.herokuapp.com";

window.addEventListener("DOMContentLoaded", init);

//array

function init() {
  console.log("tis ");
  popBut.addEventListener("click", () => {
    popUp.classList.toggle("active");
  });

  brew.style.display = "none";
  checkout.style.display = "none";
  bar.style.display = "block";
  fetchJson(updateUrl, printKegs);
  fetchJson(url, filterData);
  setTimeout(updateDashboard, 20);
}

function updateDashboard() {
  fetchJson(updateUrl, updateAll);

  setTimeout(updateDashboard, 2000);
}

function filterData(jsonData) {
  jsonData.forEach(displayBeer);

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
