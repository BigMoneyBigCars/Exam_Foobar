export const nav = document.querySelector("#nav-container");
const navElements = document.querySelectorAll("#nav-container .nav");

const nAtags = document.querySelectorAll(".navigation > a");
const dAtags = document.querySelectorAll("#desktop-menu > a");
const toggler = document.querySelector(".menu__toggler");
const menu = document.querySelector(".mobile-menu-dropdown");
const atags = document.querySelector(".atags-mobile-menu");
const mAtags = document.querySelectorAll(".atags-mobile-menu > a");

toggler.addEventListener("click", () => {
  toggler.classList.toggle("active");
  document.querySelector("body > main > h1").classList.toggle("blurred");
  atags.classList.toggle("fade-in-left");
  menu.classList.toggle("active");
  menu.classList.toggle("shadow");
});

mAtags.forEach((a) => {
  a.addEventListener("click", () => {
    atags.classList.toggle("fade-in-left");
    document.querySelector("body > main > h1").classList.toggle("blurred");
    toggler.classList.toggle("active");
    menu.classList.toggle("active");
    menu.classList.remove("shadow");
  });
});
