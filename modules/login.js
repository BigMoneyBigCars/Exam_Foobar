//GET
const endpoint = "https://trellocopy-abcd.restdb.io/rest/login";
const apiKey = "5e9844eb436377171a0c2461";

export function constDataman() {
  const form = document.querySelector("form");
  const register = document.querySelector("#registerform");
  const elements = form.elements;
  const elements2 = register.elements;
  console.log(elements, elements2);
  /*  window.form = form;
  console.log(elements);
  window.elements = elements; */

  //buttons
  const submit = document.querySelector("button.signin");
  const submit2 = document.querySelector("#registerform > div.action > button.showsignin");
  const submit3 = document.querySelector("button.register");
  const submit4 = document.querySelector("#registerform > div.action > button.registeruser");
  const forgot = document.querySelector("a.link");

  const data = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  };

  forgot.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#forgotpassword").style = "display: block";
  });

  submit3.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("form").style = "display: none";
    document.querySelector("#registerform").style = "display: block";
  });
  submit4.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#registerform").style = "display: none";
    document.querySelector("form").style = "display: block";
  });
  submit.addEventListener("click", (e) => {
    e.preventDefault();

    post({ email: elements.email.value, password: elements.password.value });
  });

  submit2.addEventListener("click", (e) => {
    e.preventDefault();

    post({ firstname: elements2.firstname.value, lastname: elements2.lastname.value, email: elements2.email.value, password: elements2.password.value });
  });
  if (elements.confirmpassword != elements.password) {
    console.log("ERROR");
  } else console.log("Welcomeback", elements.firstname);
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
