import getProduct from "./utils/produtcs.js";
import productRes from "./utils/produtcs.js";

let body = document.body;
let login = document.getElementById("login");
let log = document.getElementById("log");
let box = document.createElement("div");
let form = document.createElement("form");
let user = document.createElement("input");
let pass = document.createElement("input");
let btnLog = document.createElement("button");
let error = document.createElement("p");
let userName;
let userPass;
let nick = document.createElement("a");
let userFromStorage = localStorage.getItem("user");
let userForRequest = JSON.parse(userFromStorage);
let btnOut = document.createElement("a");
let ul;
let bug = document.createElement("a");
let bugCount = document.createElement("span");
let pr_res = document.getElementById("productresult");

bug.classList.add("bug");
bugCount.classList.add("bugCount");
bugCount.textContent = 0;
bug.append(bugCount);

box.classList.add("box");
form.classList.add("form");
btnLog.classList.add("btnLog");
pass.type = "password";
btnLog.textContent = "Войти";
user.placeholder = "Введите логин";
pass.placeholder = "Введите пароль";
form.append(error, user, pass, btnLog);
box.append(form);

login.addEventListener("click", () => {
  body.prepend(box);
});

if (userForRequest) {
  userName = userForRequest;
  check();
}

function check() {
  box.remove();
  let log = document.getElementById("log");
  let img = document.createElement("img");

  log.innerHTML = "";
  nick.textContent = userName;
  img.src =
    "https://i.pinimg.com/1200x/d0/a2/e2/d0a2e243610bde1be54defdca162e47a.jpg";
  btnOut.textContent = "Выйти";
  btnOut.href = "./index.html";
  btnOut.classList.add("out");
  nick.classList.add("nick");
  img.classList.add("ava");
  log.append(bug, nick, img, btnOut);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  userName = user.value.trim();
  userPass = pass.value.trim();

  try {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        for (const userInfo of json) {
          if (
            userInfo.username === userName &&
            userInfo.address.zipcode === userPass
          ) {
            check();
            localStorage.setItem("user", JSON.stringify(userName));
          }
          if (
            userInfo.username !== userName ||
            userInfo.address.zipcode !== userPass
          ) {
            error.textContent = "Неверный логин или пароль";
            error.style.color = "red";
          }
        }
      });
  } catch (errorFromServer) {
    console.log(errorFromServer);
  } finally {
    console.log("ehfff");
  }
});

btnOut.addEventListener("click", () => {
  localStorage.clear();
});

nick.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((json) => {
      let title = document.head;
      title.children[2].innerHTML = `${userName} profile`;
      let nickInfo = json.filter((user) => user.username === userName);
      if (!Boolean(ul)) {
        createInfo(nickInfo[0]);
      }
    });
});

function createInfo(obj) {
  let app = document.getElementById("app");
  let li;
  ul = document.createElement("ul");
  ul.classList.add("list-item");
  let arr = [obj.name, obj.email, obj.id, obj.address.street, obj.address.city];
  let arr2 = ["name", "email", "id", "street", "city"];
  for (const ar in arr) {
    li = document.createElement("li");
    li.textContent = `${arr2[ar]}: ${arr[ar]}`;
    li.classList.add("item");
    ul.append(li);
  }
  app.append(ul);
}

// let categoriesBtn = document.querySelectorAll(".categories");
// categoriesBtn.forEach((btn) =>
//   btn.addEventListener("click", function () {
//     categoriesBtn.forEach((btn) => {
//       btn.classList.remove("active");
//     });

//     this.classList.add("active");
//     productRes.innerHTML = "";
//     let ress = `https://fakestoreapi.com/products/category/${this.id}`;
//     getProduct(ress);
//   })
// );

// let find = document.getElementById("find");
// find.addEventListener("input", function () {
//   console.log(this.value);
// });

// let range = document.getElementById("range");

// range.addEventListener("mouseup", function () {
//   console.log(this.value);
// });

// document.addEventListener("DOMContentLoaded", function () {
//   getProduct("");
// });
