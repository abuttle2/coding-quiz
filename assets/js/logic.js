let startScreen = document.getElementById("start-screen");
let startBtn = document.getElementById("start");
let questionsEl = document.getElementById("questions");
let questionsTitleEl = document.getElementById("question-title");
let endScreenEl = document.getElementById("end-screen");
let feedbackEl = document.getElementById("feedback");
let choicesEl = document.getElementById("choices");
var timerEl = document.getElementById("time");

var currentQuestion;
let timer;
let timerCount = 45;

const correctAudio = document.getElementById("correctAudio");
const incorrectAudio = document.getElementById("incorrectAudio");

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
            }
        }
        if (timerCount === 0) {
            // Clears interval when timer is 
            clearInterval(timer);
        }
    }, 1000);
}

let startQuiz = function () {
    //Remove start screen onClick and unhide the questions
    currentQuestion = 0;
    startTimer();
    isComplete = false;
    startScreen.remove();
    questionsEl.setAttribute("class", "show");
    displayQuestions(questions);
}

let endQuiz = function () {
    //Stop timer and clear element
    timerCount = 0;
    var timerParEl = document.querySelector(".timer");
    timerParEl.textContent = '';
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
                btnEl.textContent = questionsArr[i].choices[j];
                choicesEl.appendChild(btnEl);
                choiceButtons.push(btnEl);

                btnEl.addEventListener("click", function () {
                    // event.target.style.color = "salmon";
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
                        endQuiz();
                    }

                    let checkAnswer = function () {
                        //Compare strings to check for correct answer
                        if (btnEl.textContent.toLowerCase() === questionsArr[i].answer.toLowerCase()) {
                            console.log("Correct");
                            currentScore += timerCount / 2;
                            console.log("Score: " + currentScore);
                            correctAudio.play();
                        }
                        else {
                            console.log("Incorrect");
                            currentScore -= 10;
                            console.log("Score: " + currentScore);
                            incorrectAudio.play();
                        }
                    }

                    checkAnswer();
                });
            }
        }
    }
}

startBtn.addEventListener("click", startQuiz);
