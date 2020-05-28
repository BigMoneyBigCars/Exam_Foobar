import { bar, brew, checkout, topLabel, order } from "./nav";

import { confirmation, payBut, orderID } from "./consts";
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
  console.log("ajskdasdjasldjkjn");
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

  const closeBtn = document.querySelector(".closebtn");
  const successScreen = document.querySelector("#confirmation");
  closeBtn.addEventListener("click", () => {
    successScreen.style.display = "none";
    brew.style.display = "none";
    bar.style.display = "none";
    checkout.style.display = "none";
    order.style.display = "block";
    topLabel.textContent = "Orders";

    console.log("LUK FOR SATAN");
  });

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
      printOrderItem(data);
    });
}

function printOrderItem(data) {
  console.log(data);
  let id = data.id;
  console.log(id);

  const cloneOrderID = document.querySelector(".order-ID").cloneNode(true).content;
  const parentOrderID = document.querySelector("#orders > article > .wrapper .itemOrder");

  cloneOrderID.querySelector(".orderNr").textContent = id;
  parentOrderID.appendChild(cloneOrderID);

  orderArray.forEach((e) => {
    console.log(id);

    const cloneOrder = document.querySelector(".orderItems").cloneNode(true).content;
    const parentOrder = document.querySelector("#orders > article > .wrapper .orderItem-container");
    cloneOrder.querySelector(".items p").textContent = e.name;
    cloneOrder.querySelector(".items p + p").textContent = e.amount;

    parentOrder.appendChild(cloneOrder);
  });
}
