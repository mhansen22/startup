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
                //alert
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
