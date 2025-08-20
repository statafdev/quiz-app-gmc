const QA = [
  {
    q: "What is the capital of Palestine ?",
    a: ["Jerusalem", "Ramallah", "Gaza", "Deir el Balah"],
    cIdx: 0,
  },
  {
    q: "Chkoun el Zaeim ?",
    a: ["Mus", "Djawad", "Anis", "Zaeim"],
    cIdx: 0,
  },
  {
    q: "Who was in Paris ?",
    a: ["Kanye", "Merouane", "Anouche Mafia", "Niggas"],
    cIdx: 3,
  },
];

let qidx = 0;
let selectedAnswer = null;
let hasConfirmed = false;
let time = 4;
let timerFunction;

const gameSection = document.getElementById("game");
const startSection = document.getElementById("start");
const timerSection = document.getElementById("timer");
const qtext = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const nextButton = document.querySelector(".next");
const timerButton = document.getElementById("timer-btn");

const start = () => {
  startSection.style.display = "none";
  timerSection.style.display = "flex";
  timer();
};

const timer = () => {
  timerFunction = setInterval(() => {
    timerButton.textContent = time;
    if (time == 0) {
      timerButton.textContent = "START";
      timerButton.addEventListener("click", startQuiz);
      clearInterval(timerFunction);
    }
    time--;
  }, 1000);
};

const startQuiz = () => {
  timerSection.style.display = "none";
  gameSection.style.display = "flex";
  qtext.textContent = QA[qidx].q;

  const answers = QA[qidx].a
    .map((el, idx) => {
      return `<li class="option" onclick="select(${idx})">${el}</li>`;
    })
    .join("");

  optionsList.innerHTML = answers;
};

const select = (idx) => {
  selectedAnswer = idx;
  const options = document.querySelectorAll(".option");

  options.forEach((el, index) => {
    el.classList.remove("selected");
    if (index == idx && !hasConfirmed) {
      el.classList.add("selected");
    }
  });
};

const confirm = () => {
  if (typeof selectedAnswer != "number") {
    window.alert("Select answer first");
    return;
  }

  if (hasConfirmed) return;

  const newAnswers = QA[qidx].a
    .map((el, idx) => {
      const correctClassname =
        idx == QA[qidx].cIdx
          ? "correct"
          : idx == selectedAnswer
          ? "incorrect"
          : "";
      return `<li class="option ${correctClassname}" data-index="${idx}" onclick="select(${idx})">${el}</li>`;
    })
    .join("");

  optionsList.innerHTML = newAnswers;
  hasConfirmed = true;
  nextButton.style.display = "block";
};

next = () => {
  if (!hasConfirmed) return;
  if (qidx < QA.length - 1) {
    qidx++;
    console.log("from next question : ", qidx);
    hasConfirmed = false;
    nextButton.style.display = "none";
    startQuiz();
  } else {
    window.alert("Quiz finished");
  }
};
