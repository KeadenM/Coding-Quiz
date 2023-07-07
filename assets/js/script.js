var Questions = [
    // question framework thanks to https://simplestepscode.com/javascript-quiz-tutorial/
    // questions from w3 schools https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS
    {
      question: "Which of the following is not a JavaScript data type?",
      answers: {
        a: "Boolean",
        b: "String",
        c: "Character",
        d: "String",
      },
      correctAnswer: "c",
    },
    {
      question: "What is used to define a function within JavaScript?",
      answers: {
        a: "def",
        b: "var",
        c: "let",
        d: "function",
      },
      correctAnswer: "d",
    },
    {
      question: "Inside what HTML element do you put the JavaScript?",
      answers: {
        a: "<js>",
        b: "<script>",
        c: "<scripting>",
        d: "<javascript>",
      },
      correctAnswer: "b",
    },
    {
      question: "What operator is used to assign a value to a variable?",
      answers: {
        a: "=",
        b: "-",
        c: "X",
        d: "*",
      },
      correctAnswer: "a",
    },
    {
      question: "How does a FOR loop start?",
      answers: {
        a: "for (i=0; i <=5)",
        b: "for i=1 to 5",
        c: "for (1 <=5; i++)",
        d: "for (i=0; i <=5; i++)",
      },
      correctAnswer: "d",
    },
  ];
  
  // Var's for all aspects to make the quiz work (timer, questions, answers, etc)
  var totalScore = 0;
  var quizArea = document.querySelector("#quizArea");
  var answers = document.querySelector("#answers");
  var startQuiz = document.querySelector("#QuizStart");
  var timer = document.querySelector("#timeRemaining");
  var timerInterval;
  var secondsLeft = 60;
  var endQuiz = false;
  
  function setTime() {
    timerInterval = setInterval(function () {
      secondsLeft--;
      timer.textContent = secondsLeft + " seconds left.";
  
      if (secondsLeft === 0) {
        clearInterval(timerInterval);
        timer.textContent = "Out of time!";
        restartGame();
      }
    }, 1000);
  }
  
  startQuiz.addEventListener("click", function () {
    setTime();
    displayQuestion(0);
  });
  
  function displayQuestion(index) {
    if (endQuiz) {
      return;
    }
  
    if (index < Questions.length) {
      quizArea.textContent = "";
      answers.innerHTML = "";
  
      var currentQuestion = Questions[index];
      quizArea.textContent = currentQuestion.question;
  
      for (var key in currentQuestion.answers) {
        var answerOption = document.createElement("button");
        answerOption.textContent = key.toUpperCase() + ": " + currentQuestion.answers[key];
        answerOption.setAttribute("data-answer", key);
        answerOption.classList.add("answer-button");
        answers.appendChild(answerOption);
      }
  
      var answerButtons = document.querySelectorAll(".answer-button");
      answerButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
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
      //Collecting user initials and saving their score
  
      var userInitials = prompt("Please enter your initials:").toUpperCase();
  
      var userIdentifier = userInitials;
      var userTotalScore = {
        identifier: userIdentifier,
        score: totalScore,
      };
      //Putting user data into a JSON string
      var userTotalJSON = JSON.stringify(userTotalScore);
      //Saving string to local storage
      localStorage.setItem("quizScore", userTotalJSON);
    }
  }
  
  // Code to reveal high scores
  
  var viewHighScore = document.querySelector("#viewHighScore");
  
  viewHighScore.addEventListener("click", function () {
    displayHighScores();
  });
  
  function displayHighScores() {
    var savedTotalJSON = localStorage.getItem("quizScore");
  
    var savedScore = JSON.parse(savedTotalJSON);
  
    var highScoreList = document.querySelector("#highScoreList");
  
    var listItem = document.createElement("li");
    listItem.textContent = savedScore.identifier + ": " + savedScore.score;
  
    highScoreList.appendChild(listItem);
  }
  
  //Reset button
  
  var resetButton = document.querySelector(".reset-button");
  
  function restartGame() {
    //Reseting everything except high scores
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
  
  //Giving option to hide the high scores after viewing them
  
  var hideHighScore = document.querySelector("#hideHighScore");
  
  hideHighScore.addEventListener("click", function () {
    hideHighScores();
    viewHighScore.style.display = "block";
    hideHighScore.style.display = "none";
  });
  
  function hideHighScores() {
    var highScoreList = document.querySelector("#highScoreList");
    highScoreList.innerHTML = "";
  }