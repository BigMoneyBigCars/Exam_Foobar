"use strict";
import "@babel/polyfill";

import { nav } from "./modules/nav.js";

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("tis ");
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
}

function displayBeer(beer) {
  /*   console.log(beer);
  let image = beer.name.trim().toLowerCase();
  console.log(image);

  let firstSpace = image.indexOf(" ");
  let firstName = image.substring(0, firstSpace);
  let lastSpace = image.lastIndexOf(" ");
  let lastName = image.substring(lastSpace + 1, image.length);
  let middleName = image.substring(firstSpace + 1, lastSpace);

  if (middleName == " ") {
    middleName = "";
  }

  image = firstName + middleName + lastName;
 */
  const clone = document.querySelector("template").cloneNode(true).content;

  clone.querySelector("h1").textContent = beer.name;
  clone.querySelector("p").textContent = "Alcohol " + beer.alc + "%";
  console.log(beer.label);
  clone.querySelector(".img").style.backgroundImage = "url('/imgs/" + [beer.label] + "')";
  document.querySelector("#container").appendChild(clone);
}
