import { orderArray } from "./addRemoveBeer";

export function checkPrice() {
  console.log(orderArray);
  let totalPrice = 0;

  orderArray.forEach((obj) => {
    orderArray.filter((x) => x.amount > 0);

    totalPrice = totalPrice + obj.amount * 35;
    console.log(totalPrice);
  });

  document.querySelector("#receipt .total").textContent = "TOTAL SUM: " + totalPrice + " DKK";
  document.querySelector("#receipt .total").textContent = totalPrice + " DKK";
  document.querySelector("#receipt .total-container .total").textContent = totalPrice + " DKK";
  document.querySelector("#paymentform > div > div.checkouttotalcontainer > p").textContent = totalPrice + " DKK";
  document.querySelector("#paynow").textContent = "Pay " + totalPrice + " DKK";
}
