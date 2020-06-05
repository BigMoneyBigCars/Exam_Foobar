import { popBut } from "./consts";
import { popUp } from "./consts";

export function showPopUp(beer) {
  popUp.classList.toggle("active");
  console.log(beer);
  document.querySelector("body").classList.toggle("OHidden");
  popUp.querySelector("h1").textContent = beer.name;
  popUp.querySelector(".product-image").src = "imgs/1x/" + beer.label;
  popUp.querySelector(".type").textContent = beer.category;
  popUp.querySelector(".alc").textContent = beer.alc;
  popUp.querySelector(".impression p").textContent = beer.description.overallImpression;
  popUp.querySelector(".appearance p").textContent = beer.description.appearance;
  popUp.querySelector(".aroma p").textContent = beer.description.aroma;
  popUp.querySelector(".flavour p").textContent = beer.description.flavor;
  popUp.querySelector(".mouthfeel p").textContent = beer.description.mouthfeel;
}
