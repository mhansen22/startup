const username = localStorage.getItem("Username");
          const usernameDisplay = document.querySelector(".usernameDisplay");
          if (usernameDisplay) {
              usernameDisplay.textContent = username;
          }


          // document.getElementById("accessCodeForm").addEventListener("submit", function(event) {
          //     event.preventDefault();
          //     const adminCode = localStorage.getItem("adminCode");
          //     const enteredCode = document.getElementById("accessCode").value;
          //     if (enteredCode === adminCode) {
                
          //         window.location.href = "voting.html";
          //     } else {
                  
          //         document.getElementById("error").style.display = "block";
          //     }
          // });

          document.getElementById("accessCodeForm").addEventListener("submit", function(event) {
              event.preventDefault();
              const adminCode = localStorage.getItem("adminCode");
              const enteredCode = document.getElementById("accessCode").value;
              if (enteredCode === adminCode) {
                  window.location.href = "voting.html";
              } else {
                  document.getElementById("error").style.display = "block";
              }
          });