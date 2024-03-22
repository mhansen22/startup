const username = localStorage.getItem("Username");
            const usernameDisplay = document.querySelector(".usernameDisplay");
            if (usernameDisplay) {
                usernameDisplay.textContent = username;
            }
  
            
            async function fetchMovieData() {
                //TO BE CHANGED!!!
                // return [
                //     { title: "Inception", genre: "Action", year: 2010, director: "Christopher Nolan" },
                //     { title: "The Shawshank Redemption", genre: "Drama", year: 1994, director: "Frank Darabont" },
                //     { title: "The Godfather", genre: "Crime", year: 1972, director: "Francis Ford Coppola" }
                // ];
                try {
                  const response = await fetch('/api/movies');
                  if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  return response.json();
                } catch (error) {
                console.error('Fetch error: ', error);
                }
            }

            
  
            async function populateMovieTable() {
                const movies = await fetchMovieData();
                const tbody = document.getElementById("movieTableBody");
                tbody.innerHTML = movies.map(movie => `
                    <tr>
                        <td>${movie.title}</td>
                        <td>${movie.genre}</td>
                        <td>${movie.year}</td>
                        
                        <td><input type="radio" name="vote" value="${movie.title}"></td>
                    </tr>
                `).join('');
            }

            document.addEventListener("DOMContentLoaded", async () => {
                await populateMovieTable();
            });
  
            //future webscoket
            class VotingChoice {
              constructor(choiceElement) {
                this.choiceElement = choiceElement;
              }
            
              async submitVote() {
                return new Promise((resolve, reject) => {
                  const formData = new FormData(document.getElementById("votingForm"));
                  const selectedVote = formData.get("vote");
                  //replace with ACTUAL websocket stuff
                  setTimeout(() => {
                    console.log(`Vote submitted: ${selectedVote}`);
                    resolve(selectedVote);
                  }, 1000);
                });
              }
            }
            
            document.getElementById("votingForm").addEventListener("submit", async (event) => {
              event.preventDefault();
              const selectedOption = document.querySelector("input[type='radio']:checked");
              if (selectedOption) {
                const choice = new VotingChoice(selectedOption);
                try {
                  const voteResult = await choice.submitVote();
                  console.log("Vote submitted successfully:", voteResult);
                  alert("Vote submitted successfully!");
                  event.target.submit();
                } catch (error) {
                  console.error("Error submitting vote:", error);
                  alert("Failed to submit vote. Please try again.");
                }
              } else {
                alert("Please select a top choice before proceeding.");
              }
            });