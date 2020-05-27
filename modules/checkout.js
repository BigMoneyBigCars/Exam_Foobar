import { bar, brew, checkout, topLabel } from "./nav";

import { confirmation, payBut } from "./consts";
import { receipt } from "./consts";
import { orderArray } from "./addRemoveBeer";

export function toggleCheckout() {
  console.log("toggle checkkout");
  brew.style.display = "none";
  bar.style.display = "none";
  checkout.style.display = "block";
  topLabel.textContent = "Checkout";

  receipt.classList.toggle("active");

  console.log(payBut);
}

export function displayConfirmation(orderArray) {
  console.log(orderArray);
  console.log("Tististsi");
  confirmation.style.display = "grid";
  confirmation.querySelector("h2").textContent = "Success!";
  confirmation.querySelector("p").textContent = "Your will be prepared as soon as possible";
  setTimeout(() => {
    confirmation.style.display = "none";
  }, 2000);

  postArray(orderArray);
}

function postArray(data) {
  const postData = JSON.stringify(data);

  fetch("https://foobar-exam.herokuapp.com", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",

      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}
