let startScreen = document.getElementById("start-screen");
let startBtn = document.getElementById("start");
let questionsEl = document.getElementById("questions");
let questionsTitleEl = document.getElementById("question-title");
let endScreenEl = document.getElementById("end-screen");
let finalScoreEl = document.getElementById("final-score");
let feedbackEl = document.getElementById("feedback");
let choicesEl = document.getElementById("choices");
let submitBtn = document.getElementById("submit");
let timerEl = document.getElementById("time");
let initialsEl = document.getElementById("initials");

let currentQuestion = 0;
let timer;
let timerCount = 3;

var answerMessage = '';

// let displaySubmit = function () {
//     console.log("Function has been called");

//     if (hasEnded) {
//         //TODO: For the end screen, change the class for this element to be "show" and setup an event listener on the submit button (id = "submit" & is a child of end-screen);


//         //TODO: Load highscores page when submit/end-screen button is clicked

//         //TODO: Use local storage to players initial and the score from the quiz

//         //TODO: Add to array of scores in the scores.js???
//     }
// }

let startTimer = function () {
    // Sets timer which will call invoke every second
    timer = setInterval(function () {
        timerCount--;
        timerEl.textContent = timerCount;
        if (timerCount <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

let startQuiz = function () {
    //Remove start screen onClick and unhide the questions
    currentQuestion = 0;
    startTimer();
    startScreen.remove();
    questionsEl.setAttribute("class", "show");
    displayQuestions(questions, currentQuestion);

    //Create the element which will later be appended with the answer
    answerMessage = document.createElement("p");
    feedbackEl.appendChild(answerMessage);
}

let submit = function () {
    let errorTxt = document.createElement("p");

    submitBtn.addEventListener("click", function () {
        var userInitials = document.getElementsByTagName("input")[0].value;
        console.log("X");
        // TODO: Get the current value of the text box for the players initials once submit has been entered
        if (userInitials !== "" && userInitials.length <= 3) {
            console.log(userInitials);
            errorTxt.textContent = "";
        }
        else {
            errorTxt.textContent = "Please provide initials";
            errorTxt.setAttribute("class", "error");
            endScreenEl.appendChild(errorTxt);
        }
    });
}

let endQuiz = function () {
    //Stop timer and set end condition
    timerCount = 0;
    clearInterval(timer);

    //Clear on-screen elements
    let timerParEl = document.querySelector(".timer");
    timerParEl.textContent = '';
    questionsEl.remove();
    endScreenEl.setAttribute("class", "show");
    finalScoreEl.textContent = currentScore;
    //Call submit function which will add an event listener, store initials & the score.
    submit();
}

let updateScore = function (isCorrect) {
    const correctAudio = document.getElementById("correctAudio");
    const incorrectAudio = document.getElementById("incorrectAudio");

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
            choiceButtons.forEach(function (btnEl) {
                btnEl.remove();
            });

            if (currentQuestion < questionsArr.length) {
                displayQuestions(questionsArr, questionIndex);
            }
            else {
                console.log("Condition met")
                questionsTitleEl.textContent = '';
                endQuiz();
            }

            let checkAnswer = function () {
                //Set attribute to show feedback for answers
                //Hide after X number of seconds.
                feedbackEl.setAttribute("class", "feedback");

                setTimeout(function () {
                    feedbackEl.setAttribute("class", "feedback hide");
                }, 1000);

                if (btnEl.textContent.toLowerCase() == questionsArr[questionIndex].answer.toLowerCase()) {
                    updateScore(true);
                    answerMessage.textContent = "Correct!";
                }
                else {
                    updateScore(false);
                    answerMessage.textContent = "Wrong!";
                }
            }
            checkAnswer();
        });
    }
}

startBtn.addEventListener("click", startQuiz);
// displaySubmit();

