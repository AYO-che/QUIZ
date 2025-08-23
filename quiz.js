let startBox = document.getElementById("startBox");
let quizBox = document.getElementById("quizBox");
let resultBox = document.getElementById("resultBox");

let startBtn = document.getElementById("startBtn");
let restartBtn = document.getElementById("restartBtn");

let questionElement = document.getElementById("question");
let choicesElement = document.getElementById("choices");
let scoreText = document.getElementById("scoreText");

let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");
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
let answered = [];

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
  answered = [];
};

function showQuestion() {
  choicesElement.innerHTML = "";
  questionElement.innerHTML = questions[currentQuestion].question;
  nextBtn.disabled = true;

  for (let i = 0; i < questions[currentQuestion].options.length; i++) {
    let btn = document.createElement("button");
    btn.innerHTML = questions[currentQuestion].options[i];
    btn.className = "choiceBtn";

    if (answered[currentQuestion] !== undefined) {
      let correctIndex = questions[currentQuestion].answer;
      if (i === answered[currentQuestion]) {
        btn.style.background = (i === correctIndex ? "green" : "red");
      }
      if (i === correctIndex) btn.style.background = "green";
      btn.disabled = true;
      nextBtn.disabled = false;
    }

    btn.onclick = function() {
      checkAnswer(i, btn);
    };
    choicesElement.appendChild(btn);
  }
}

nextBtn.onclick = function() {
  if (answered[currentQuestion] !== undefined) {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }
};

prevBtn.onclick = function() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
};

function checkAnswer(choiceIndex, btn) {
  let correctIndex = questions[currentQuestion].answer;

  if (answered[currentQuestion] === undefined) {
    if (choiceIndex === correctIndex) score++;
  }
  answered[currentQuestion] = choiceIndex;

  if (choiceIndex === correctIndex) {
    btn.style.background = "green";
  } else {
    btn.style.background = "red";
    let choiceButtons = document.getElementsByClassName("choiceBtn");
    choiceButtons[correctIndex].style.background = "green";
  }

  let choiceButtons = document.getElementsByClassName("choiceBtn");
  for (let j = 0; j < choiceButtons.length; j++) {
    choiceButtons[j].disabled = true;
  }

  nextBtn.disabled = false;
}

function showResult() {
  quizBox.style.display = "none";
  resultBox.style.display = "block";
  scoreText.innerHTML = "You scored " + score + " out of " + questions.length;
}
