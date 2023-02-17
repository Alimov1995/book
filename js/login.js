import findElement from "./utils/findElement.js";

const formLogin = findElement("#form-login");
const userName = findElement("#user-input");
const password = findElement("#pass-input");
const userError = findElement("#user-error");
const passError = findElement("#pass-error");

const errorTextGenered = (element, textErr) => {
  element.textContent = textErr;
  element.style.display = "block";

  const timer = setTimeout(() => {
    element.style.display = "none";
    clearTimeout(timer);
  }, 3000);
};

formLogin.addEventListener("submit", (evt) => {
  evt.preventDefault();

  if (userName.value.length == 0) {
    errorTextGenered(userError, "Iltimos ma'lumot to'ldiring");

    return;
  }
  if (password.value.length < 8) {
    errorTextGenered(passError, "parol 8ta simvoldan kam bolish kerak emas");

    return;
  }

  const user = {
    // email: "eve.holt@reqres.in",
    // password: "cityslicka",
    email: userName.value,
    password: password.value,
  };

  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => {
      if (res.status === 400) {
        throw new Error("Bunday foydalanuvchi mavjud emas");
      }
      return res.json();
    })
    .then((data) => {
      if (data.token) {
        const token = data.token;
        localStorage.setItem("token", token);
        window.location.href = "http://127.0.0.1:5501/home.html";
      }
    })
    .catch((err) => {
      errorTextGenered(userError, err);
    });
});
