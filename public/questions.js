document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem("Username");
    const usernameDisplay = document.querySelector(".usernameDisplay");
    if (usernameDisplay) {
        usernameDisplay.textContent = username;
    }

    const submitBtn = document.querySelector("button[type='submit']");
    const form = document.getElementById("movieSelectorForm");

    submitBtn.addEventListener("click", function(event) {
        event.preventDefault();
        if (validateForm()) {
            submitMovieForm();
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

    function submitMovieForm() {
        const genre = document.querySelector('input[name="genre"]:checked').value;
        const length = document.querySelector('input[name="length"]:checked').value.split('-');
        const minLength = length[0];
        const maxLength = length[1] || '';

        const queryParams = new URLSearchParams({
            with_genres: genre,
            with_runtime_gte: minLength,
            with_runtime_lte: maxLength
        }).toString();

        fetch(`/api/movies?${queryParams}`, { method: 'GET' })
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch movies');
                return response.json();
            })
            .then(data => {
                if (data.length === 0) {
                    alert("No movies found, try different criteria.");
                    return;
                }
                localStorage.setItem('movies', JSON.stringify(data));
                window.location.href = 'voting.html';
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Failed to fetch movies, check the console for errors.");
            });
    }
});
