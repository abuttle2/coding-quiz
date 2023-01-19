var displayScores = function () {
    // //Fetch localStorage variables

    let result = [];
    let resultList = document.getElementById("highscores");
    let clearBtn = document.getElementById("clear");

    if (localStorage.getItem("highscores")) {
        result = JSON.parse(localStorage.getItem("highscores"));
    }
    for (let i = 0; i < result.length; i++) {
        var score = result[i];
        let liEl = document.createElement("li");
        liEl.textContent = score.userInitials + ": " + score.currentScore.toFixed(2);
        resultList.appendChild(liEl);
    }
    clearBtn.addEventListener("click", function () {
        localStorage.clear();
        result = [];
        resultList.remove();
    });
    // var lastScore = localStorage.getItem("score");

    // console.log("Loaded last initials: " + lastInitials);
    // console.log("Loaded last score: " + lastScore);
}

displayScores();



