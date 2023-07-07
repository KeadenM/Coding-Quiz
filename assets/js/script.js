// Code containing questions

//Question lay out thanks to https://simplestepscode.com/javascript-quiz-tutorial/
var questions = [
    {
      question: "Which of the following is used to define a function in JavaScript?",
      answers: {
        a: "def",
        b: "function",
        c: "var",
        d: "let"
      },
      correctAnswer: "b"
    },
    {
        question: "Which of the following is not a JavaScript data type?",
        answers: {
          a: "Number",
          b: "String",
          c: "Boolean",
          d: "Character"
        },
        correctAnswer: "d"
      },
      {
        question: "Which of the following is used to select an HTML element by its id in JavaScript?",
        answers: {
          a: "querySelector",
          b: "getElementById",
          c: "getElementsByClassName",
          d: "getElementsByTagName"
        },
        correctAnswer: "b"
      },
      {
        question: "Which of the following is used to loop through the elements of an array in JavaScript?",
        answers: {
          a: "while loop",
          b: "for loop",
          c: "do-while loop",
          d: "switch-statement"
        },
        correctAnswer: "b"
      },
      {
        question: "What is the purpose of the 'this' keyword in JavaScript?",
        answers: {
          a: "To refer to the current function",
          b: "To refer to the global object",
          c: "To refer to the parent object",
          d: "To refer to the current object"
        },
        correctAnswer: "d"
      }
  ];

//Variables for timer/quesitons/answers
var totalScore = 0;
var quizSection = document.querySelector("#quizSection");
var answers = document.querySelector("#answerSection")
var startQuiz = document.querySelector("#startQuiz");
var timer = document.querySelector("#timeLeft");
var timerInterval;
var secondsLeft = 60;
var endQuiz = false;




//Function to start timer
function setTime() {
  timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = secondsLeft + " seconds left.";

    if(secondsLeft === 0) {
     
      clearInterval(timerInterval);
      timer.textContent = "Game over!";
      restartGame()

      }

  }, 1000);
}

//Eventlistener to start quiz/timer  
startQuiz.addEventListener("click", function () {
    setTime();
    displayQuestion(0);
});

//Creating function to display questions/answers
function displayQuestion(index) {
  if (endQuiz) {
    return;
  }

    if (index < questions.length) {
    quizSection.innerHTML = "";
    answers.innerHTML = "";

    var currentQuestion = questions[index];
    quizSection.textContent = currentQuestion.question;


//Loop to cycle through questions
    for (var key in currentQuestion.answers) {
      var answerOption = document.createElement("button");
      answerOption.textContent = key.toUpperCase() + ": " + currentQuestion.answers[key];
      answerOption.setAttribute("data-answer", key);
      answerOption.classList.add("answer-button");
      answers.appendChild(answerOption);
    }

    var answerButtons = document.querySelectorAll(".answer-button");
    answerButtons.forEach(function (button) {
      button.addEventListener("click", function (event)  {
        var userAnswer = event.target.getAttribute("data-answer");
        
        
        if (userAnswer === currentQuestion.correctAnswer) {
          window.alert("Correct!");
          totalScore += 5;



        } else if (userAnswer !== currentQuestion.correctAnswer) {
          window.alert("Incorrect!");
          totalScore = Math.max(totalScore - 5, 0);
        }
          displayQuestion(index + 1);
        });
      });
    
          } else {
          endQuiz = true;
          clearInterval(timerInterval);
          timer.textContent = "Finished!";
            //Collecting user intials and saving their score

          var userInitials = prompt("Please enter your initials:").toUpperCase();

          var userIdentifier = userInitials;
          var userTotalScore = {
            indentifier: userIdentifier,
            score: totalScore
          };
            //Putting user data into a JSON string
            var userTotalJSON = JSON.stringify(userTotalScore);
            //local storage
            localStorage.setItem("quizScore", userTotalJSON);
    }
  }



var viewHighScore = document.querySelector("#viewHighScore");

viewHighScore.addEventListener("click", function () {
  displayHighScores();
  });

function displayHighScores() {

  var savedTotalJSON = localStorage.getItem("quizScore");

  var savedScore = JSON.parse(savedTotalJSON);

  var highScoreList = document.querySelector("#highScoreList");

  var listItem = document.createElement("li");
  listItem.textContent = savedScore.indentifier + ": " + savedScore.score;

  highScoreList.appendChild(listItem);
}         
    

var resetButton = document.querySelector(".reset-button");

function restartGame() {
//Reseting all but not high scores
  totalScore = 0;
  secondsLeft = 60;
  endQuiz = false;
  clearInterval(timerInterval);
  timer.textContent = "";
  answers.innerHTML = "";
  displayQuestion(0);
  setTime();
}

resetButton.addEventListener("click", restartGame);

var hideHighScore = document.querySelector("#hideHighScore");

viewHighScore.addEventListener("click", function () {
  displayHighScores();
  viewHighScore.style.display = "none";
  hideHighScore.style.display = "block";
});

hideHighScore.addEventListener("click", function () {
  hideHighScores();
  viewHighScore.style.display = "block";
  hideHighScore.style.display = "none";
});

function hideHighScores() {
  var highScoreList = document.querySelector("#highScoreList");
  highScoreList.innerHTML = "";
}