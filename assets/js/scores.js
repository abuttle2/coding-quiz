var displayScores = function () {
    let result = [];
    let resultList = document.getElementById("highscores");
    let clearBtn = document.getElementById("clear");

    if (localStorage.getItem("highscores")) {
        result = JSON.parse(localStorage.getItem("highscores"));
    }
    for (let i = 0; i < result.length; i++) {
        // var score = result[i];
        let liEl = document.createElement("li");
        liEl.textContent = result[i].userInitials + ": " + result[i].currentScore.toFixed(2);
        resultList.appendChild(liEl);
    }
    //Clear local storage
    function clearData() {
        localStorage.clear();
        result = [];
        resultList.remove();
    }
    clearBtn.addEventListener("click", clearData);
}
displayScores();



