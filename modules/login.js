//GET
import { displayConfirmation } from "./checkout";
import { orderArray } from "./addRemoveBeer";

const endpoint = "https://trellocopy-abcd.restdb.io/rest/login";
const apiKey = "5e9844eb436377171a0c2461";
let counter;
let elements;
let count = 0;
let data;
const signup = document.querySelector("#registerform");
const login = document.querySelector("#login");
const payment = document.querySelector("#paymentform");

export function constDataman() {
  //buttons
  const submit = document.querySelector("button.signin");
  const submit2 = document.querySelector("#registerform > div.action > button.showsignin");
  const submit3 = document.querySelector("button.register");
  const submit4 = document.querySelector("#registerform > div.action > button.registeruser");
  const paynow = document.querySelector("#paynow");
  const forgot = document.querySelector("a.link");
  /*  validateForm(signup.elements, signup); */
  // validateForm(login.elements, login);

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
  paynow.addEventListener("click", (e) => {
    e.preventDefault();

    counter = 0;
    console.log(counter);
    let form = document.querySelector("#paymentform");
    let elements = form.elements;
    form.setAttribute("novalidate", true);

    let input = form.querySelectorAll("input");
    console.log(input);
    input.forEach((el) => {
      el.classList.remove("invalid");
      console.log(el);
    });

    validateForm(input, form);

    if (counter > 0) {
      console.log("CANNOT DO SHIT");
    } else if (counter === 0) {
      console.log("WORKS FFS");
      setTimeout(() => {
        displayConfirmation(orderArray);
      }, 1000);
    }
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
      //console.log("er her");
      //console.log(el);

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

document.querySelectorAll("input").forEach((e) => {
  console.log(e);
  e.addEventListener("keyup", () => {
    e.classList.remove("invalid");
  });
});

async function get() {
  console.log("it workz");

  let response = await fetch(endpoint, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset-utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
  });
  data = await response.json();
  if (document.querySelector("#registerform").style.display == "block") {
    console.log("register form");
    data.forEach((data) => {
      console.log(data);
      const email = document.querySelector("#registerform .email").value;
      console.log(email);
      if (email == data.email) {
        count++;
        console.log("JA");
      } else {
        console.log("IKKE");
      }
    });
    console.log(count);
    loopData(data);
  } else {
    console.log("loginform");
    data.forEach(checkData);
  }

  /*  .then((e) => e.json())
    /*  .then((e) => console.log(e)) */
  /*.then(showHeroes); */
}

function loopData(data) {
  const email = document.querySelector("#email").value;
  if (count === 1) {
    console.log("email not unique");
    console.log("input: " + email + " " + "bd: " + data.email);
    document.querySelector("#email").classList.add("invalid");
    document.querySelector(".mail").textContent = "|| Not unique. Go to 'already submitted'";
    window.addEventListener("keyup", function () {
      document.querySelector("#email").classList.remove("invalid");
    });
  }
  if (count === 0) {
    console.log("email can be used");
    /*   post({
        firstname: form.elements.firstname.value,
        lastname: form.elements.lastname.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      }); */
    signup.reset();
    document.querySelector("#registerform").style.display = "none";
    document.querySelector("#login").style.display = "block";

    /* document.querySelector("#the_form").classList.add("hide");
      document.querySelector("#the_form_check").classList.remove("flex");
      document.querySelector("#the_form_check").classList.add("hide");
      document.querySelector(".container1").style.overflow = "scroll";
      document.querySelector(".container1").removeEventListener("scroll", setPosition);
      document.querySelector("#bc_site").classList.remove("hide");
      document.querySelector(".theFormText").classList.add("hide");
      document.querySelector("header").classList.remove("hide"); */
  }
  count = 0;
}

function checkData(data) {
  console.log("checkData");

  let checkget = 0;

  const email = document.querySelector("#email").value;
  if (email == data.email) {
    checkget;
    console.log("Already used");
    console.log("input: " + email + " " + "bd: " + data.email);
    document.querySelector(".welcome").classList.remove("hidden");
    document.querySelector(".welcome").textContent = "Welcome back " + data.firstname + "!";
    document.querySelector(".invalid_text").style.display = "none";
    setTimeout(() => {
      document.querySelector(".welcome").classList.add("hidden");

      document.querySelector("#loginscreen").classList.add("active");

      /*       document.querySelector("#the_form_check").classList.add("hide");
        document.querySelector("#the_form_check").classList.remove("flex"); */
      //document.querySelector(".container1").style.overflow = "scroll";
      /*  document.querySelector(".container1").removeEventListener("scroll", setPosition);
      document.querySelector(".theFormText").classList.add("hide"); */
    }, 2000);
  } else {
    console.log(email);
    console.log("does not match");
    document.querySelector("#email").classList.add("invalid");
    window.addEventListener("keyup", function () {
      document.querySelector("#email").classList.remove("invalid");
    });
  }
}

//POST

function post(data) {
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
