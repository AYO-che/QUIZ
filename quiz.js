let startBox = document.getElementById("startBox");
let quizBox = document.getElementById("quizBox");
let resultBox = document.getElementById("resultBox");

let startBtn = document.getElementById("startBtn");
let restartBtn = document.getElementById("restartBtn");

let questionElement = document.getElementById("question");
let choicesElement = document.getElementById("choices");
let scoreText = document.getElementById("scoreText");


let questions = [
  {
    question: "What does CPU stand for?",
    options: ["Central Processing Unit", "Computer Personal Unit", "Central Print Unit"],
    answer: 0
  },
  {
    question: "Which of these is a programming language?",
    options: ["HTML", "Python", "CSS"],
    answer: 1
  },
  {
    question: "What does RAM stand for?",
    options: ["Random Access Memory", "Read Access Module", "Run Active Memory"],
    answer: 0
  },
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "HighText Machine Language", "Hyper Tabular Markup Language"],
    answer: 0
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "/* */", ""],
    answer: 0
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    options: ["=", "==", "==="],
    answer: 0
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    options: ["alert('Hello World')", "msg('Hello World')", "console.log('Hello World')"],
    answer: 0
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Netscape", "Google"],
    answer: 1
  },
  {
    question: "Which HTML attribute is used to reference an external JavaScript file?",
    options: ["src", "href", "link"],
    answer: 0
  },
  {
    question: "How do you create a function in JavaScript?",
    options: ["function myFunc()", "create myFunc()", "func myFunc()"],
    answer: 0
  },
  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: ["var", "let", "const"],
    answer: 2
  }
];

let currentQuestion = 0;
let score = 0;

startBtn.onclick = function() {
  startBox.style.display = "none";
  quizBox.style.display = "block";
  showQuestion();
};

restartBtn.onclick = function() {
  resultBox.style.display = "none";
  startBox.style.display = "block";
  currentQuestion = 0;
  score = 0;
};

function showQuestion() {
  choicesElement.innerHTML = "";
  questionElement.innerHTML = questions[currentQuestion].question;

  for (let i = 0; i < questions[currentQuestion].options.length; i++) {
    let btn = document.createElement("button");
    btn.innerHTML = questions[currentQuestion].options[i];
    btn.className = "choiceBtn";
    btn.onclick = function() {
      checkAnswer(i, btn);
    };
    choicesElement.appendChild(btn);
  }
}

function checkAnswer(choiceIndex, btn) {
  let correctIndex = questions[currentQuestion].answer;

  if (choiceIndex === correctIndex) {
    score = score + 1;
    btn.style.background = "green";
  } else {
    btn.style.background = "red";
    let choiceButtons = document.querySelectorAll(".choiceBtn");
    choiceButtons[correctIndex].style.background = "green";
  }

  let choiceButtons = document.querySelectorAll(".choiceBtn");
  for (let j = 0; j < choiceButtons.length; j++) {
    choiceButtons[j].disabled = true;
  }

  setTimeout(showNextQuestion, 500);
}

function showNextQuestion() {
  currentQuestion = currentQuestion + 1;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizBox.style.display = "none";
  resultBox.style.display = "block";
  scoreText.innerHTML = "You scored " + score + " out of " + questions.length;
}
