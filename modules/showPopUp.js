import { popBut } from "./consts";
import { popUp } from "./consts";

export function showPopUp(beer) {
  popUp.classList.toggle("active");
  console.log(beer);
  popUp.querySelector("h1").textContent = beer.name;
  popUp.querySelector(".img").style.backgroundImage = "url('/imgs/" + [beer.label] + "')";
  popUp.querySelector(".type").textContent = beer.category;
  popUp.querySelector(".alc").textContent = beer.alc;

  popUp.querySelector(".impression p").textContent = beer.description.overallImpression;
  popUp.querySelector(".appearance p").textContent = beer.description.appearance;
  popUp.querySelector(".aroma p").textContent = beer.description.aroma;
  popUp.querySelector(".flavour p").textContent = beer.description.flavor;
  popUp.querySelector(".mouthfeel p").textContent = beer.description.mouthfeel;
}
