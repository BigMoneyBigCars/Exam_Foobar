import { addBeerArray } from "./addRemoveBeer";
import { removeBeerArray } from "./addRemoveBeer";
import { showPopUp } from "./showPopUp";

export function displayBeer(beer) {
  console.log(beer);
  let article = beer.name.trim().toLowerCase();
  console.log("here", article);

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
  clone.querySelector("img").src = "imgs/" + beer.label;
  //clone.querySelector(".img").style.backgroundImage = "url('/imgs/" + [beer.label] + "')";
  document.querySelector("#container").appendChild(clone);
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
