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

export function formatCreditCard() {
  var x = document.getElementById("credit-card");
  var index = x.value.lastIndexOf("-");
  var test = x.value.substr(index + 1);
  if (test.length === 4 && x.value.length < 16) {
    x.value = x.value + "-";
  }
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
  console.log(data);
  const postData = JSON.stringify(data);

  fetch("https://foobar-exam2.herokuapp.com/order", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

const closeBtn = document.querySelector(".closebtn");
const successScreen = document.querySelector("#confirmation");
closeBtn.addEventListener("click", () => {
  successScreen.style.display = "none";
  console.log("LUK FOR SATAN");
});
