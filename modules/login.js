//GET
const endpoint = "https://trellocopy-abcd.restdb.io/rest/login";
const apiKey = "5e9844eb436377171a0c2461";
let counter;
let elements;
/* const register = document.querySelector("#registerform");
const form = document.querySelector("form");
const elements = form.elements;
const elements2 = register.elements; */

export function constDataman() {
  /*   console.log(elements, elements2); */

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

    counter = 0;
    console.log(counter);
    let form = document.querySelector("#login");
    let elements = form.elements;
    form.setAttribute("novalidate", true);

    let input = form.querySelectorAll("input");
    console.log(input);
    input.forEach((el) => {
      el.classList.remove("invalid");
      console.log(el);
    });

    validateForm(input, form);
  });

  submit2.addEventListener("click", (e) => {
    e.preventDefault();

    counter = 0;
    console.log(counter);
    let form = document.querySelector("#registerform");
    let elements = form.elements;
    form.setAttribute("novalidate", true);

    let input = form.querySelectorAll("input");
    console.log(input);
    input.forEach((el) => {
      el.classList.remove("invalid");
      console.log(el);
    });

    validateForm(input, form);

    if (counter === 0) {
      console.log("submitted");
      post({ firstname: elements.firstname.value, lastname: elements.lastname.value, email: elements.email.value, password: elements.password.value });
    }
  });
}

function validateForm(input, form) {
  console.log(input);

  if (form.checkValidity()) {
    console.log("checking validity");
    get();
  } else {
    input.forEach((el) => {
      console.log("er her");
      console.log(el);

      if (!el.checkValidity()) {
        counter++;
        console.log(el);
        console.log(el.id);
        el.classList.add("invalid");
        console.log("invalid");
      }
    });
  }
}

function get() {
  console.log("it workz");
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
