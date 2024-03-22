const username = localStorage.getItem("Username");
          const usernameDisplay = document.querySelector(".usernameDisplay");
          if (usernameDisplay) {
              usernameDisplay.textContent = username;
          }

          // document.addEventListener("DOMContentLoaded", function() {
          //   const urlParams = new URLSearchParams(window.location.search);
          //   const username = urlParams.get('username');
          //   document.getElementById("Username").innerText = username;
          //   alert("Username from URL: " + username);
          // });