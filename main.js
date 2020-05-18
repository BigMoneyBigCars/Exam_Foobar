"use strict";
import "@babel/polyfill";

import { nav } from "./modules/nav.js";

window.addEventListener("DOMContentLoaded", init);

const popBut = document.querySelector("#product-details");
const popUp = document.querySelector("#product-details");

const receipt = document.querySelector("#receipt");
const receiptBut = document.querySelector(".receipt-button");

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
  clone.querySelector("article").classList.add(article);
  clone.querySelector("article").addEventListener("click", () => {
    showPopUp(beer);
  });

  clone.querySelector("h1").textContent = beer.name;
  clone.querySelector("p").textContent = "Alcohol " + beer.alc + "%";
  console.log(beer.label);
  clone.querySelector(".img").style.backgroundImage = "url('/imgs/" + [beer.label] + "')";
  document.querySelector("#container").appendChild(clone);
}

// POPUP

function showPopUp(beer) {
  popUp.classList.toggle("active");

  popUp.querySelector("h1").textContent = beer.name;
  popUp.querySelector(".img").style.backgroundImage = "url('/imgs/" + [beer.label] + "')";
  popUp.querySelector(".type").textContent = beer.category;
  popUp.querySelector(".alc").textContent = beer.alc;

  console.log(beer.description.aroma);
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
