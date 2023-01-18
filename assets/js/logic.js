let startScreen = document.getElementById("start-screen");
let startBtn = document.getElementById("start");
let questionsEl = document.getElementById("questions");
let questionsTitleEl = document.getElementById("question-title");
let endScreenEl = document.getElementById("end-screen");
let feedbackEl = document.getElementById("feedback");
let choicesEl = document.getElementById("choices");
let timerEl = document.getElementById("time");

let currentQuestion = 0;
let timer;
let timerCount = 30;

const correctAudio = document.getElementById("correctAudio");
const incorrectAudio = document.getElementById("incorrectAudio");

let startTimer = function () {
    // Sets timer which will call invoke every second
    timer = setInterval(function () {
        timerCount--;
        timerEl.textContent = timerCount;

        if (timerCount >= 0) {
            if (isComplete && timerCount > 0) {
                clearInterval(timer);
            }
        }
        if (timerCount === 0) {
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
    displayQuestions(questions, currentQuestion);
}

let endQuiz = function () {
    //Stop timer and clear element
    // timerCount = 0;
    let timerParEl = document.querySelector(".timer");
    timerParEl.textContent = '';
}

let updateScore = function (isCorrect) {
    if (isCorrect) {
        console.log("Correct");
        currentScore += 5;
        currentScore += timerCount * 0.15;
        correctAudio.play();
    } else {
        console.log("Incorrect");
        currentScore -= 5;
        incorrectAudio.play();
    }

    console.log("Score: " + currentScore.toFixed(2));
}


let displayQuestions = function (questionsArr, questionIndex) {
    // Loop through the questions and dynamically update text based on an index variable.
    //So we can push each generated button to the array and process later
    var questionIndex = currentQuestion;
    let choiceButtons = [];
    questionsTitleEl.textContent = questionsArr[questionIndex].question;

    currentQuestion++;

    for (let i = 0; i < questionsArr[questionIndex].choices.length; i++) {
        let btnEl = document.createElement("button");
        btnEl.textContent = questionsArr[questionIndex].choices[i];
        choicesEl.appendChild(btnEl);
        choiceButtons.push(btnEl);

        btnEl.addEventListener("click", function () {
            // event.target.style.color = "salmon";

            console.log(questionIndex);

            // Clear choices when the next question is loaded
            choiceButtons.forEach(function (btnEl) {
                btnEl.remove();
            });

            if (currentQuestion < questionsArr.length) {
                displayQuestions(questionsArr, questionIndex);
            }
            else {
                questionsTitleEl.textContent = '';
                endQuiz();
            }

            let checkAnswer = function () {
                feedbackEl.setAttribute("class", "feedback");
                let feedbackTxt = document.createElement("p");
                //Set attribute to show feedback for answers
                //Hide after X number of seconds.
                setTimeout(function () {
                    feedbackEl.setAttribute("class", "feedback hide");
                }, 3000);

                if (btnEl.textContent.toLowerCase() == questionsArr[questionIndex].answer.toLowerCase()) {
                    updateScore(true);

                    //TODO: For the end screen, change the class for this element to be "show" and setup an event listener on the submit button (id = "submit" & is a child of end-screen);


                    //TODO: Load highscores page when submit/end-screen button is clicked

                    //TODO: Use local storage to players initial and the score from the quiz

                    //TODO: Add to array of scores in the scores.js???
                }
                else {
                    updateScore(false);
                }
            }

            checkAnswer();
        });
    }
}



startBtn.addEventListener("click", startQuiz);

