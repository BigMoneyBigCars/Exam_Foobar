/* let form = document.querySelecter("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  return false;
  console.log(submit);
}); */

//GET
const endpoint = "https://trellocopy-abcd.restdb.io/rest/login";
const apiKey = "5e9844eb436377171a0c2461";

export function constDataman() {
  document.querySelector("#testcontainer > button.add-new").addEventListener("click", () => {
    const data = {
      email: "",
      password: "",
    };
    post(data);
  });
}

function get() {
  document.querySelector("#loginscreen").innerHTML = "";
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

  const parent = document.querySelector("#loginscreen");
  console.log(parent);

  copy.querySelector("h1").textContent = hero.email;
  copy.querySelector("p").textContent = hero.password;

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
