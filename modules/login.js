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

    document.querySelector("#registerform").classList.add = "fadeObjectIn";
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

    validateFormPayment(input, form);

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
    //console.log(input);
    input.forEach((el) => {
      el.classList.remove("invalid");
      // console.log(el);
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
    //  console.log(input);
    input.forEach((el) => {
      el.classList.remove("invalid");
      //console.log(el);
    });

    validateForm(input, form);

    if (counter === 0) {
      console.log("submitted");
      post({ firstname: elements.firstname.value, lastname: elements.lastname.value, email: elements.email.value, password: elements.password.value });
    }
  });
}
function validateFormPayment(input, form) {
  console.log(form);
  console.log(form.id);

  if (form.checkValidity()) {
    console.log("checking validity PAYMENTFORM");
  } else {
    input.forEach((el) => {
      if (!el.checkValidity()) {
        counter++;
        el.classList.add("invalid");
      }
    });
  }
}

function validateForm(input, form) {
  console.log(form);
  console.log(form.id);

  if (form.checkValidity()) {
    console.log("checking validity");

    if (form.id === "registerform") {
      console.log("#email found");
      getRegister();
    } else {
      console.log("#email NOT found");
      getLogin();
    }
  } else {
    input.forEach((el) => {
      if (!el.checkValidity()) {
        counter++;
        el.classList.add("invalid");
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

async function getRegister() {
  console.log("REGISTER LOGIN ");

  let response = await fetch(endpoint + `?q={"email": "kk@dk.dk"}`, {
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
  }
}

async function getLogin() {
  console.log("LOGIN LOGIN");

  let emailLogin = document.querySelector("#email").value;
  console.log(emailLogin);

  let response = await fetch(endpoint + `?q={"email": "${emailLogin}"}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset-utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
  });
  data = await response.json();
  console.log(data);

  if (data.length != 0) {
    data.forEach(checkData);
    console.log("there is data");
  } else {
    console.log("there is not data");

    console.log("does not match");
    document.querySelector("#email").classList.add("invalid");
    window.addEventListener("keyup", function () {
      document.querySelector("#email").classList.remove("invalid");
    });
  }
}

function loopData(data) {
  console.log(count);
  const email = document.querySelector(".email").value;
  if (count === 1) {
    console.log("email not unique");
    console.log("input: " + email + " " + "bd: " + data.email);
    document.querySelector("#registerform > div.content > div:nth-child(3) > p").textContent = "Email already in use. Go back to login";
    document.querySelector(".email").classList.add("invalid");

    console.log(document.querySelector(".mail"), "HER");
    window.addEventListener("keyup", function () {
      document.querySelector(".email").classList.remove("invalid");
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
  }
  count = 0;
}

function checkData(data) {
  console.log("checkData");

  console.log(data);
  console.log(data.email);

  let checkget = 0;

  const emailLogin = document.querySelector("#email").value;
  const passwordLogin = document.querySelector("#password").value;
  console.log(emailLogin);

  if (emailLogin == data.email && passwordLogin == data.password) {
    console.log("Already used");

    document.querySelector("form#login .content").classList.add("fadeObjectOut");
    document.querySelector("#loginscreen h1").classList.add("fadeObjectOut");
    document.querySelector("#loginscreen .action").classList.add("fadeObjectOut");
    document.querySelector("form#login").addEventListener("animationend", () => {
      document.querySelector(".welcome").classList.remove("hidden");
      document.querySelector(".welcome").textContent = "Welcome " + data.firstname + "!";
      document.querySelector(".invalid_text").style.display = "none";

      setTimeout(() => {
        document.querySelector(".welcome").classList.add("hidden");

        document.querySelector("#loginscreen").classList.add("active");
      }, 2000);
    });
  } else if (emailLogin == data.email && passwordLogin != data.password) {
    console.log("does not match");
    document.querySelector("#password").classList.add("invalid");
    document.querySelector("#login > div.content > div:nth-child(2) > p").textContent = "Password does not match email";

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
