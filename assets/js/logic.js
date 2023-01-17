let startScreen = document.getElementById("start-screen");
let startBtn = document.getElementById("start");
let questionsEl = document.getElementById("questions");
let questionsTitleEl = document.getElementById("question-title");
let endScreenEl = document.getElementById("end-screen");
let feedbackEl = document.getElementById("feedback");
let choicesEl = document.getElementById("choices");

//Monitor click events for the start button
let startQuiz = function () {
    //Remove start screen onClick and unhide the questions
    startScreen.remove();
    questionsEl.setAttribute("class", "show");
    displayQuestions();
}


var currentQuestion = 0;

let displayQuestions = function () {
    // Loop through the questions and dynamically update text based on an index variable.
    for (let i = 0; i < questions.length; i++) {
        if (i === currentQuestion) {
            questionsTitleEl.textContent = questions[i].question;

            for (let j = 0; j < questions[i].choices.length; j++) {
                let btnEl = document.createElement("button");
                btnEl.textContent = j + 1 + ". " + questions[i].choices[j];
                choicesEl.appendChild(btnEl);

                btnEl.addEventListener("click", function (event) {
                    event.target.style.color = "salmon";
                    currentQuestion++;
                    displayQuestions();
                });
            }
        }
    }
}




// switch (currentQuestion) {
//     case 0:
//         break;
//     case 1:
//         break;
//     case 2:
//         break;
//     case 3:
//         break;

startBtn.addEventListener("click", startQuiz);

// var buttons = document.getElementById('button');

// addEventListener("click", function () {

// })
