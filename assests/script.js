//Defining my questions and answers
const quiz = [
  {
    question: "Question 1?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answer: 0
  },
  {
    question: "Question 2?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answer: 2
  },
  {
    question: "Question 3?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answer: 2
  },
  {
    question: "Question 4?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answer: 2
  },
  {
    question: "Question 5?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answer: 2
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

// Start the quiz
displayQuestion();
startTimer();
