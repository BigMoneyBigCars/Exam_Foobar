export const nav = document.querySelector("#nav-container");

const toggler = document.querySelector(".menu__toggler");
const menu = document.querySelector(".mobile-menu-dropdown");
const atags = document.querySelector(".atags-mobile-menu");
const mAtags = document.querySelectorAll(".atags-mobile-menu > a");

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
  });
});
