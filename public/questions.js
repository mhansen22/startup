const username = localStorage.getItem("Username");
        const usernameDisplay = document.querySelector(".usernameDisplay");
        if (usernameDisplay) {
            usernameDisplay.textContent = username;
        }


        //check for answering all questions
        var submitBtn = document.querySelector("button[type='submit']");
        var form = document.querySelector("form");

        submitBtn.addEventListener("click", function(event) {
            event.preventDefault();
            if (validateForm()) {
                //alert("Checked!");
                form.submit();
             } else {
                alert("Please answer all questions before proceeding.");
            }
        });

        function validateForm() {
            const questions = document.querySelectorAll(".question");
            for (let i = 0; i < questions.length; i++) {
                const inputs = questions[i].querySelectorAll("input[type='radio']");
                let answered = false;
                for (let j = 0; j < inputs.length; j++) {
                    if (inputs[j].checked) {
                         answered = true;
                        break;
                    }
                }
                if (!answered) {
                    return false;
                }
            }
            return true;
        }

        document.getElementById("movieSelectorForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            const queryParams = new URLSearchParams(formData).toString();
          
            fetch(`/api/movies?${queryParams}`, {
              method: 'GET'
            })
              .then(response => response.json())
              .then(data => {
                console.log('Movies:', data);
                //here
              })
              .catch(error => {
                console.error('Failed to fetch movies:', error);
              });
          });