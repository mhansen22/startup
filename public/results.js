const username = localStorage.getItem("Username");
    const usernameDisplay = document.querySelector(".usernameDisplay");
    if (usernameDisplay) {
        usernameDisplay.textContent = username;
    }

    //example data :)
    const votingData = [
        { movie: "Movie 1", votes: 4 },
        { movie: "Movie 2", votes: 2 },
        { movie: "Movie 3", votes: 1 },
    ];

    //HERE WEBSOCKET DATA WILL BE IMPLEMENTED WITH function updateUI(votingData) {

    //sort by votes
    votingData.sort((a, b) => b.votes - a.votes);

    //update winner and runnerup data
    const movieWinner = document.getElementById("movieWinner");
    const movieRunnerup = document.getElementById("movieRunnerup");
    const winnerVotes = document.getElementById("winnerVotes");
    const runnerupVotes = document.getElementById("runnerupVotes");

    if (votingData.length > 0) {
        movieWinner.textContent = votingData[0].movie;
        // winnerVotes.textContent = votingData[0].votes;
        winnerVotes.textContent = `Received: ${votingData[0].votes} votes`;
    }

    if (votingData.length > 1) {
        movieRunnerup.textContent = votingData[1].movie;
        // runnerupVotes.textContent = votingData[1].votes;
        runnerupVotes.textContent = `Received: ${votingData[1].votes} votes`;
    }