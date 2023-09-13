let btn = document.getElementById("btn");
let root = document.getElementById("root");
let form = document.createElement("form");
let user = document.createElement("input");
let pass = document.createElement("input");
let btnSub = document.createElement("button");
let h2 = document.createElement("h2");

btn.addEventListener("click", () => {
  btnSub.textContent = "Войти";
  form.append(user, pass, btnSub);
  root.append(form);
});

let db = [
  {
    userName: "Petr",
    userPass: "123321",
  },
  {
    userName: "Vasya",
    userPass: "qwerty",
  },
];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let userName = user.value.toUpperCase().trim();
  let userPass = pass.value;
  let enter = false;
  for (const elem of db) {
    if (userName == elem.userName.toUpperCase() && userPass == elem.userPass) {
      enter = true;
      createH(enter);
      user.remove();
      pass.remove();
      btnSub.remove();
      break;
    }
    if (userName == elem.userName.toUpperCase() || userPass == elem.userPass) {
      createH(enter);
      break;
    }
  }
  if (!enter) {
    createH(enter);
  }
});

function createH(flag) {
  if (flag) {
    h2.textContent = "Вы зашли";
    h2.style.color = "green";
    btn.remove();
  } else {
    h2.textContent = "Неверный логин или пароль";
    h2.style.color = "red";
  }
  root.prepend(h2);
}

user.onfocus = function (e) {
  if (this.classList.contains("invalid")) {
    this.classList.remove("invalid");
  }
};

pass.onfocus = function (e) {
  if (this.classList.contains("invalid")) {
    this.classList.remove("invalid");
  }
};

user.onblur = function (e) {
  if (!this.value) {
    this.placeholder = "Данное поле обязательно";
    this.classList.add("invalid");
  }
};

pass.onblur = function (e) {
  if (!this.value) {
    this.placeholder = "Данное поле обязательно";
    this.classList.add("invalid");
  }
};
