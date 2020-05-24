import { orderArray } from "./addRemoveBeer";
import { checkPrice } from "./checkPrice";

export function closeReceipt() {
  console.log(receipt);
  receipt.classList.remove("active");
}

export function updateReceipt() {
  document.querySelector("#receipt .container").innerHTML = "";

  orderArray.forEach((beer) => {
    let article = beer.name.trim().toLowerCase();
    console.log(beer);

    let firstSpace = article.indexOf(" ");
    let firstName = article.substring(0, firstSpace);
    let lastSpace = article.lastIndexOf(" ");
    let lastName = article.substring(lastSpace + 1, article.length);
    let middleName = article.substring(firstSpace + 1, lastSpace);

    if (middleName == " ") {
      middleName = "";
    }
    article = firstName + middleName + lastName;

    console.log(article);

    const receiptTemp = document.querySelector(".receipt-temp").cloneNode(true).content;
    console.log(receiptTemp);

    if (article == "hollabacklager") {
      article = "hollaback";
    }

    //receiptTemp.querySelector("img").src = "/imgs/" + article + ".png";
    //ceiptTemp.querySelector(".img").style.backgroundImage = "url('/imgs/" + [article] + ".png')";
    receiptTemp.querySelector(".item").textContent = beer.name;
    receiptTemp.querySelector(".item-amount").textContent = beer.amount;
    receiptTemp.querySelector(".price").textContent = beer.amount * 35 + " DKK";
    document.querySelector("#receipt .container").appendChild(receiptTemp);
  });
  checkPrice();
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
