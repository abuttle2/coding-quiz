let startScreen = document.getElementById("start-screen");
let startBtn = document.getElementById("start");
let questionsEl = document.getElementById("questions");
let questionsTitleEl = document.getElementById("question-title");
let endScreenEl = document.getElementById("end-screen");
let feedbackEl = document.getElementById("feedback");

var currentQuestion = 0;

//Monitor click events for the start button
var startQuiz = function () {
    //Remove start screen onClick and unhide the questions
    startScreen.remove();
    questionsEl.setAttribute("class", "show");
    displayQuestions();
}

var displayQuestions = function () {

    // Loop through the questions and dynamically update text based on an index variable.
    for (var i = 0; i < questions.length; i++) {
        if (i === currentQuestion) {
            questionsTitleEl.textContent = questions[i].question;
            //TODO: Loop through the answers any dynamically create the options based on the answer array length.
            for (let j = 0; j < questions[i].choices.length; j++) {
                console.log(questions[i].choices[j]);
            }
        }
    }

    switch (currentQuestion) {
        case 0:
            break;
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
    }
}

startBtn.addEventListener("click", startQuiz);