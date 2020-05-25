export const nav = document.querySelector("#nav-container");

const toggler = document.querySelector(".menu__toggler");
const menu = document.querySelector(".mobile-menu-dropdown");
const atags = document.querySelector(".atags-mobile-menu");
const mAtags = document.querySelectorAll(".atags-mobile-menu > a");

export const bar = document.querySelector("#theBar");
export const brew = document.querySelector("#theBrew");
export const checkout = document.querySelector("#checkout");
export const topLabel = document.querySelector("nav .label");

toggler.addEventListener("click", () => {
  toggler.classList.toggle("active");

  atags.classList.toggle("fade-in-left");
  menu.classList.toggle("active");
  menu.classList.toggle("shadow");
});

mAtags.forEach((a) => {
  a.addEventListener("click", () => {
    atags.classList.toggle("fade-in-left");

    toggler.classList.toggle("active");
    menu.classList.toggle("active");
    menu.classList.remove("shadow");
    if (a.className == "theBar") {
      brew.style.display = "none";
      checkout.style.display = "none";
      bar.style.display = "block";
      topLabel.textContent = "The Bar";
    }

    if (a.className == "theBrew") {
      checkout.style.display = "none";
      bar.style.display = "none";
      brew.style.display = "block";
      topLabel.textContent = "The Brew";
    }
    if (a.className == "checkout") {
      brew.style.display = "none";
      bar.style.display = "none";
      checkout.style.display = "block";
      topLabel.textContent = "Checkout";
    }
  });
});
