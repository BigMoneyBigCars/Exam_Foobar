export let orderArray = [];
export function addBeerArray(beer, amount) {
  //  orderArray[beer] = amount;
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
}

export function removeBeerArray(beer, amount) {
  console.log(amount);

  const exists = orderArray.find((x) => x.name === beer);
  if (exists) {
    exists.amount = amount;
  }

  orderArray = orderArray.filter((x) => x.amount > 0);
  console.log(orderArray);
  /*   const index = orderArray.indexOf(beer);
    if (index > -1) {
      orderArray.splice(index, 1);
    } */
  orderedItems();
}

function orderedItems() {
  let count = 0;

  orderArray.forEach((obj) => {
    count += obj.amount;
  });
  // console.log(count);

  if (count == 0) {
    document.querySelector("#order .amount").textContent = "Your basket is empty";
  } else {
    document.querySelector("#order .amount").textContent = "You are about to add " + [count] + " items";
  }
}
// POPUP
