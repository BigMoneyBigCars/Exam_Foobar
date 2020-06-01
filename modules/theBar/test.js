function jonasB(data) {
  console.log(data);

  console.log(servingArray);
  if (data) {
    jonas.querySelector("#jonas .makingOrder p").textContent = "Preparing order";
    jonas.querySelector("#jonas .makingOrder p + p").textContent = "Nr. " + data.servingCustomer;

    const findOrder = servingArray.find(({ id }) => id === data.servingCustomer);
    if (findOrder) {
      console.log(findOrder);
      let order = findOrder.order;
      console.log(order);
      document.querySelector(".theOrder .contain").innerHTML = "";
      order.forEach((item) => {
        console.log(item);
        const clone = document.querySelector(".items-in-order").cloneNode(true).content;
        clone.querySelector(".beer").textContent = item;

        const parent = document.querySelector(".theOrder .contain");
        parent.appendChild(clone);
      });
    }
  }

  // jonas.querySelector(".status").textContent = "Bartender is currently " + data.status;

  // jonas.querySelector(".statusDetail").textContent = data.statusDetail;

  if ((data.statusDetail = "pourBeer")) {
    console.log(data.statusDetail);
    let existss = kegArray.find(({ id }) => id === data.usingTap);
    if (existss) {
      let beerBeingServed = existss.beer;
      console.log(beerBeingServed);
      jonas.querySelector("#jonas .tap").textContent = "Using tap nr " + (data.usingTap + 1);
      jonas.querySelector("#jonas .currentBeer p").textContent = beerBeingServed;
      jonas.querySelector("#jonas .cont p").classList.add("loader");
    }
  } else if ((data.statusDetail = "releaseTap")) {
    console.log(data.statusDetail);
    jonas.querySelector(" #jonas .tap").textContent = "releasing tap";
  } else if ((data.statusDetail = "replaceKeg")) {
    console.log(data.statusDetail);
    jonas.querySelector("#jonas .tap").textContent = "Replacing a keg";
  } else {
    jonas.querySelector("#jonas .currentBeer p").textContent = "";
    jonas.querySelector("#jonas.tap").textContent = "";
    jonas.querySelector("#jonas .cont p").classList.remove("loader");
  }

  console.log(data);
}
