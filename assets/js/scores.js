let currentScore = 0;

let highscoresObj = {
    initials: [],
    scores: []
};

//Fetch localStorage variables
var lastInitials = localStorage.getItem("initials");
var lastScore = localStorage.getItem("score");

console.log("Loaded last initials: " + lastInitials);
console.log("Loaded last score: " + lastScore);



var clearScores = function () {

}
