const username = localStorage.getItem("Username");
    const usernameDisplay = document.querySelector(".usernameDisplay");
    if (usernameDisplay) {
        usernameDisplay.textContent = username;
    }


    // //example data :)
    // const votingData = [
    //     { movie: "Movie 1", votes: 4 },
    //     { movie: "Movie 2", votes: 2 },
    //     { movie: "Movie 3", votes: 1 },
    // ];

    // //HERE WEBSOCKET DATA WILL BE IMPLEMENTED WITH function updateUI(votingData) {

    // //sort by votes
    // votingData.sort((a, b) => b.votes - a.votes);

    // //update winner and runnerup data
    // const movieWinner = document.getElementById("movieWinner");
    // const movieRunnerup = document.getElementById("movieRunnerup");
    // const winnerVotes = document.getElementById("winnerVotes");
    // const runnerupVotes = document.getElementById("runnerupVotes");

    // if (votingData.length > 0) {
    //     movieWinner.textContent = votingData[0].movie;
    //     // winnerVotes.textContent = votingData[0].votes;
    //     winnerVotes.textContent = `Received: ${votingData[0].votes} votes`;
    // }

    // if (votingData.length > 1) {
    //     movieRunnerup.textContent = votingData[1].movie;
    //     // runnerupVotes.textContent = votingData[1].votes;
    //     runnerupVotes.textContent = `Received: ${votingData[1].votes} votes`;
    // }



    document.addEventListener("DOMContentLoaded", () => {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        const ws = new WebSocket(`${protocol}://${window.location.host}/ws`);
        console.log(`the webSocket URL: ${protocol}://${window.location.host}/ws`);

        ws.onopen = () => {
            console.log("I am connected WebSocket server.");
        };
    
        ws.onmessage = (event) => {
            console.log("I received a message from server:", event.data);
            const data = JSON.parse(event.data);
            if (data.type === 'updateTopMovie') {
                updateTopMovieUI(data.movieTitle, data.count);
            }
        };
    
        function updateTopMovieUI(movieTitle, votes) {
            console.log("new movie being added/updated");
            const movieWinnerElement = document.getElementById("movieWinner");
            const winnerVotesElement = document.getElementById("winnerVotes");
    
            movieWinnerElement.textContent = movieTitle || 'Waiting for votes...';
            winnerVotesElement.textContent = `Received: ${votes} votes`;
        }
    });

    function displayMsg(cls, from, msg) {
        const chatText = document.querySelector('#player-messages');
        chatText.innerHTML =
          `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
    }