var Questions = [
    // question framework thanks to https://simplestepscode.com/javascript-quiz-tutorial/
    // questions from w3 schools https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS
    {
        question: "Which of the following is not a JavaScript data type?",
        answers: {
            a: "Boolean",
            b: "String",
            C: "Character",
            d: "String"
        },
        correctAnswer: "C" 
    },
    {
        question: "What is used to define a function wihtin JavaScript?",
        answers: {
            a: "def",
            b: "var",
            C: "let",
            d: "function",
        },
        correctAnswer: "d"
    },
    {
        question: "Inside what HTML eleme do you put the JavaScript?" ,
        answers: {
            a: "<js>",
            b: "<script>",
            C: "<scripting>",
            d: "<javascript>",
        },
        correctAnswer: "b"
    },
    {
        question: "What operator is used to assign a value to a variable?",
        answers: {
            a: "=",
            b: "-",
            C: "X",
            d: "*",
        },
        correctAnswer: "a"
    },
    {
        question: "How does a FOR loop start?",
        answers: {
            a: "for (i=0; i <=5)",
            b: "for i=1 to 5",
            C: "for (1 <=5; i++)",
            d: "for (i=0; i <=5; i++)",
        },
        correctAnswer: "d"
    },
];

// Var's for all aspects to  make the quiz work (timer, questions, answers, etc)
var totalScore = 0;
var quizArea = document.querySelector("#quizArea");
var answers = document.querySelector("#answers")
var QuizStart = document.querySelector("#QuizStart");
var timeRemaining = document.querySelector("#timeRemaining");
var timerInterval;
var secondsLeft = 60;
var endQuiz = false;

function setTime() {
    timerInterval = setinterval(function() {
    secondsLeft--;
    timer.textContent = secondsLeft + "seconds left.";

    if (secondsLeft ===0) {
        clearInterval(timerInterval);
        timer.textContent = "Out of time!";
        restartGame()
        }
    }, 1000);
}