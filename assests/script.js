//Defining my questions and answers
const quiz = [
  {
    question: "APIs allow web developers to?",
    options: ["create dynamic, interactive web applications.", "define elements like paragraphs", "Run git bash", "style index.html"],
    answer: 0
  },
  {
    question: "What does HTML stand for?",
    options: ["Home Text Memory Language", "Hit The Mother Load", "Hypertext Markup Language", "Hypertext Markup Layout"],
    answer: 2
  },
  {
    question: "Which tag has the smallest font?",
    options: ["<h1>", "<h4>", "<h3>", "<h2>"],
    answer: 1
  },
  {
    question: "What are boolean attributes in HTML?",
    options: ["an attribute that can be either true or false", "an attribute that can create an image", "an attribute that can change the background color", "None of the above"],
    answer: 0
  },
  {
    question: "All properties and methods of JSON are static; what other object is static?",
    options: ["boolean", "MATH", "Set", "Weakset"],
    answer: 1
  },

];

let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;

const timerElement = document.getElementById("time-left");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit-btn");
const resultElement = document.getElementById("result");
const initialsInput = document.getElementById("initials");
const saveButton = document.getElementById("save-btn");
const startButton = document.getElementById("startGame");

// Display question and options
function displayQuestion() {
  const currentQuestion = quiz[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  optionsElement.innerHTML = "";
  currentQuestion.options.forEach((option, index) => {
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = `option${index}`;
    li.appendChild(input);
    li.appendChild(document.createTextNode(option));
    optionsElement.appendChild(li);
  });
}

// Start the quiz timer
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

// Submit answer and check result
function submitAnswer() {
  const selectedOption = document.querySelector("input[name='answer']:checked");
  if (selectedOption) {
    const selectedAnswer = selectedOption.value;
    const currentQuestion = quiz[currentQuestionIndex];
    const correctAnswer = `option${currentQuestion.answer}`;

    if (selectedAnswer === correctAnswer) {
      resultElement.textContent = "Correct!";
    } else {
      resultElement.textContent = "Incorrect!";
      timeLeft -= 10; // Penalty for wrong answer minus 10 seconds)
      if (timeLeft < 0) {
        timeLeft = 0;
      }
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quiz.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }
}

// The End
function endQuiz() {
  clearInterval(timerInterval);
  questionElement.textContent = "Quiz ended..(Didn't like the score refresh to try again)!";
  optionsElement.innerHTML = "";
  submitButton.disabled = true;
}

// Save high score
function saveHighScore() {
  const initials = initialsInput.value;
  // Save the high score using initials
 
  console.log("High score saved:", initials);
}

// Event listeners
submitButton.addEventListener("click", submitAnswer);
saveButton.addEventListener("click", saveHighScore);
startButton.addEventListener("click", startGame);

// Start the quiz
displayQuestion();
startTimer();
function startGame() {
  const startingPage = document.getElementById("startingPage");
  const quizContainer = document.getElementById("quizContainer");

  startingPage.style.display = "none";
  quizContainer.classList.remove("hide");  
  
}