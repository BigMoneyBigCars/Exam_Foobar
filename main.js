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
  fetchJson(updateUrl, testWha);
  fetchJson(url, filterData);
}

function filterData(jsonData) {
  jsonData.forEach(displayBeer);

  receiptEventlisterner();
}

function testWha(data) {
  console.log(data);
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

    document.querySelector("#receipt .submit").disabled = false;
  } else if (document.querySelector(".checkbox:checked") !== null) {
    console.log("false");
    document.querySelector("#receipt .submit").disabled = true;
  }
}
