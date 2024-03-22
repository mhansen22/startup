function login() {
    const nameEl = document.querySelector("#Username");
    localStorage.setItem("Username", nameEl.value);
    const password = document.querySelector("#password").value;
    window.location.href = "user.html";
  }

  function createaccount() {
    const nameEl = document.querySelector("#Username");
    localStorage.setItem("Username", nameEl.value);
    const password = document.querySelector("#password").value;
    window.location.href = "user.html";
  }