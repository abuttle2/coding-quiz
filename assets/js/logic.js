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
let timerCount = 30;
var answerMessage = '';
let currentScore = 0;


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
    let validationTxt = document.createElement("p");

    submitBtn.addEventListener("click", function () {
        var userInitials = document.getElementsByTagName("input")[0].value;

        if (userInitials !== "" && userInitials.length <= 3) {
            //Store in local storage if the input is valid.

            var result = [];

            if (localStorage.getItem("highscores")) {
                result = JSON.parse(localStorage.getItem("highscores"));
            }

            result.push({ userInitials: userInitials, currentScore: currentScore });
            localStorage.setItem("highscores", JSON.stringify(result));

            console.log(result);

            validationTxt.textContent = "Data has been submitted!";
            validationTxt.setAttribute("class", "success");
            endScreenEl.appendChild(validationTxt);

            setTimeout(function () {
                window.location.href = 'highscores.html';
            }, 1000);
        } else {
            validationTxt.textContent = "Please provide valid initials!";
            validationTxt.setAttribute("class", "error");
            endScreenEl.appendChild(validationTxt);
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
    finalScoreEl.textContent = currentScore.toFixed(2);
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

    for (let i = 0; i < questionsArr[questionIndex].choices.length; i++) {
        let btnEl = document.createElement("button");
        btnEl.textContent = questionsArr[questionIndex].choices[i];
        choicesEl.appendChild(btnEl);
        choiceButtons.push(btnEl);

        btnEl.addEventListener("click", function () {
            currentQuestion++;
            choiceButtons.forEach(function (btnEl) {
                btnEl.remove();
            });
            let checkQuestion = function () {
                if (currentQuestion < questionsArr.length) {
                    displayQuestions(questionsArr, questionIndex);
                }
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
                } else {
                    updateScore(false);
                    answerMessage.textContent = "Wrong!";
                }
            }
            checkQuestion();
            checkAnswer();
            //Call end quiz function
            if (currentQuestion >= questionsArr.length || timerCount <= 0) {
                questionsTitleEl.textContent = '';
                endQuiz();
                //Call submit function which will add an event listener, store initials & the score.
                submit();
            }
        });
    }
}
startBtn.addEventListener("click", startQuiz);

