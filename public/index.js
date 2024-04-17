//prev login func!
// function login() {
//     const nameEl = document.querySelector("#Username");
//     localStorage.setItem("Username", nameEl.value);
//     const password = document.querySelector("#password").value;
//     window.location.href = "user.html";
//   }

//   function createaccount() {
//     const nameEl = document.querySelector("#Username");
//     localStorage.setItem("Username", nameEl.value);
//     const password = document.querySelector("#password").value;
//     window.location.href = "user.html";
//   }

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.querySelector("#Username").value;
  const password = document.querySelector("#password").value;
  const action = event.submitter.id;

  const url = `/api/auth/${action}`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.id) {
      localStorage.setItem("Username", email);//set username, local storage
      window.location.href = "user.html";
    } else {
      alert(data.msg);//alert!!!
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Failed to perform the operation.');
  });
});