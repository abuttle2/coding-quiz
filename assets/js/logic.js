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
    displayQuestions(questions);
}


var currentQuestion = 0;
var choiceButtons = [];

let displayQuestions = function (questionsArr) {
    // Loop through the questions and dynamically update text based on an index variable.
    //So we can push each generated button to the array and process later

    for (let i = 0; i < questionsArr.length; i++) {
        if (i === currentQuestion) {
            questionsTitleEl.textContent = questionsArr[i].question;

            for (let j = 0; j < questionsArr[i].choices.length; j++) {
                let btnEl = document.createElement("button");
                btnEl.textContent = j + 1 + ". " + questionsArr[i].choices[j];
                choicesEl.appendChild(btnEl);
                choiceButtons.push(btnEl);

                btnEl.addEventListener("click", function (event) {
                    event.target.style.color = "salmon";
                    currentQuestion++;
                    console.log(currentQuestion);

                    for (var k = 0; k < choiceButtons.length; k++) {
                        choiceButtons[k].remove();
                    }

                    if (currentQuestion < questionsArr.length) {
                        displayQuestions(questions);
                    }
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
