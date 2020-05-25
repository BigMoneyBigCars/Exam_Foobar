"use strict";

//GET
const endpoint = "https://trellocopy-abcd.restdb.io/rest/login";
const apiKey = "5e9844eb436377171a0c2461";

window.addEventListener("load", (e) => {
  document.querySelector("button.add-new").addEventListener("click", () => {
    const data = {
      email: "",
      password: "",
    };
    post(data);
  });
});
function get() {
  document.querySelector("#loginscreen").innerHTML = "";
  fetch(endpoint + "?max=100", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset-utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
  })
    .then((e) => e.json())
    /*  .then((e) => console.log(e)) */
    .then(showHeroes);
}

get();

function showHeroes(data) {
  data.forEach(showHero);
}

function showHero(hero) {
  console.log(hero);
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  const parent = document.querySelector("main");

  copy.querySelector("article").dataset.id = hero._id;
  copy.querySelector("h1").textContent = hero.Alias;
  copy.querySelector("h2 span").textContent = hero.real_name;
  const ul = copy.querySelector("ul");
  hero.powers.forEach((power) => {
    const li = document.createElement("li");
    li.textContent = power;
    ul.appendChild(li);
  });
  copy.querySelector("button").addEventListener("click", () => deleteIt(hero._id));
  parent.appendChild(copy);
}

//POST

function post(data) {
  //OPTIMISTIC INSERTS
  console.log(data);

  showHero(data);

  const postData = JSON.stringify(data);

  fetch(endpoint, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => {});
}

function deleteIt(id) {
  document.querySelector(`article[data-id="${id}"]`).remove();
  fetch(`${endpoint}/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

//PUT

function put(id) {
  const data = {
    real_name: "Master Yoda",
    Alias: "JediMaster" + Math.random(),
    Date: "unknown",
    powers: ["infinite"],
  };
  let postData = JSON.stringify(data);

  fetch(`${endpoint}/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((d) => d.json())
    .then((data) => {
      const copy = document.querySelector(`article[data-id="${id}"]`);
      copy.querySelector("h1").textContent = data.alias;
      copy.querySelector("h2 span").textContent = data.real_name;
      const ul = copy.querySelector("ul");
      data.powers.forEach((power) => {
        const li = document.createElement("li");
        li.textContent = power;
        ul.appendChild(li);
      });
    });
}

/* let form = document.querySelecter("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  return false;
  console.log(submit);
}); */
