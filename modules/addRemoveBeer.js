import { order } from "./nav";
import { addToOrder } from "./products";

export let orderArray = [];
export function addBeerArray(beer, amount) {
  const obj = {
    name: beer,
    amount: amount,
  };
  const exists = orderArray.find((x) => x.name === beer);
  console.log(exists);
  if (exists) {
    exists.amount = amount;
  } else {
    orderArray.push(obj);
  }

  console.log(orderArray);
  orderedItems();
  checkAddToOrder();
}

export function removeBeerArray(beer, amount) {
  console.log(amount);

  const exists = orderArray.find((x) => x.name === beer);
  if (exists) {
    exists.amount = amount;
  }

  orderArray = orderArray.filter((x) => x.amount > 0);
  console.log(orderArray);

  orderedItems();
  checkAddToOrder();
}

export function orderedItems() {
  let count = 0;

  orderArray.forEach((obj) => {
    count += obj.amount;
  });

  if (count == 0) {
    document.querySelector("#order .amount").textContent = "Your basket is empty";
  } else {
    document.querySelector("#order .amount").textContent = "You are about to add " + [count] + " items";
  }
}

export function resetOrderArray() {
  console.log(orderArray);
  orderArray = [];
  console.log(orderArray);
}

function checkAddToOrder() {
  if (orderArray.length > 0) {
    addToOrder.disabled = false;
  } else {
    addToOrder.disabled = true;
  }
}
