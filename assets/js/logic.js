let startScreen = document.getElementById("start-screen");
let startBtn = document.getElementById("start");
let questionsEl = document.getElementById("questions");
let questionsTitleEl = document.getElementById("question-title");
let endScreenEl = document.getElementById("end-screen");
let feedbackEl = document.getElementById("feedback");
let choicesEl = document.getElementById("choices");
var timerEl = document.getElementById("time");

let isComplete = false;
var currentQuestion = 0;
let timer;
let timerCount = 30;

let startTimer = function () {
    // Sets timer which will call invoke every second
    timer = setInterval(function () {
        timerCount--;
        timerEl.textContent = timerCount;

        if (timerCount >= 0) {
            // Tests if win condition is met
            if (isComplete && timerCount > 0) {
                // Clears interval and stops timer
                clearInterval(timer);
                winGame();
            }
        }
        if (timerCount === 0) {
            // Clears interval when timer is 0.
            clearInterval(timer);
            isComplete = true;
        }
    }, 1000);
}

//Monitor click events for the start button
let startQuiz = function () {
    //Remove start screen onClick and unhide the questions
    startTimer();
    isComplete = false;
    startScreen.remove();
    questionsEl.setAttribute("class", "show");
    displayQuestions(questions);
}

let displayQuestions = function (questionsArr) {
    // Loop through the questions and dynamically update text based on an index variable.
    //So we can push each generated button to the array and process later
    var choiceButtons = [];

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

                    // Clear choices when the next question is loaded
                    for (var k = 0; k < choiceButtons.length; k++) {
                        choiceButtons[k].remove();
                    }

                    if (currentQuestion < questionsArr.length) {
                        displayQuestions(questions);
                    }
                    else {
                        questionsTitleEl.textContent = '';
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
