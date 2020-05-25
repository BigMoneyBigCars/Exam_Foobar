//GET
const endpoint = "https://trellocopy-abcd.restdb.io/rest/login";
const apiKey = "5e9844eb436377171a0c2461";

export function constDataman() {
  const form = document.querySelector("form");
  window.form = form;
  const elements = form.elements;
  console.log(elements);
  window.elements = elements;
  const submit = document.querySelector("button.signin");

  const data = {
    email: "",
    password: "",
  };
  submit.addEventListener("click", (e) => {
    e.preventDefault();

    post({ email: elements.email.value, password: elements.password.value });
  });
}

function get() {
  document.querySelector(".testcontainer").innerHTML = "";
  fetch(endpoint, {
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
  const copy = document.querySelector("#testlogin").cloneNode(true).content;

  const parent = document.querySelector(".testcontainer");
  console.log(copy);

  copy.querySelector("h1").textContent = hero.email;
  copy.querySelector("p").textContent = hero.password;

  parent.appendChild(copy);
}

//POST

function post(data) {
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
    .then((data) => {
      console.log(data);
    });
}
