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
  
            
            class VotingChoice {
              constructor(choiceElement) {
                this.choiceElement = choiceElement;
              }
            
              async submitVote() {
                const formData = new FormData(document.getElementById("votingForm"));
                const movieTitle = formData.get("vote");
                
                const response = await fetch('/api/vote', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ movieTitle })
                });
              
                if (response.ok) {
                  const result = await response.json();
                  console.log(`Vote submitted: ${result.msg}`);
                  return movieTitle;
                } else {
                  const error = await response.json();
                  throw new Error(`Failed to submit vote: ${error.msg}`);
                }
              }
              
            }
          
          