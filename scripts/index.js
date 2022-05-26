// import login from "./login.js";
// import { EmailAndPassword, facebookUp, googleUp } from "./signup.js";

// if (window.location.pathname == "/login.html") {
//   login();
// }
// if (window.location.pathname == "/signup.html") {
//   EmailAndPassword();
//   googleUp();
//   facebookUp();
// }

// Add active class in selected list item
let list = document.querySelectorAll(".list");
let b = document.querySelectorAll(".list.active b");
list.forEach((item) => {
  item.addEventListener("click", (e) => {
    list.forEach((item) => {
      item.classList.remove("active");
    })
    item.classList.add("active");
  }
  )
}
);

let menuToggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");

menuToggle.addEventListener("click", (e) => {
  menuToggle.classList.toggle("active");
  navigation.classList.toggle("active");
})

document.querySelector(".closeAccount").style.display = "none";
if (localStorage.id) {
  document.querySelector(".closeAccount").style.display = "block";
  document.querySelector(".openAccount").style.display = "none";
}

document.querySelector(".closeAccount").addEventListener("click", (e) => {
  localStorage.clear();
  document.querySelector(".closeAccount").style.display = "none";
  document.querySelector(".openAccount").style.display = "block";
})
