const QA = {
  q: "What is the capital of Palestine ?",
  a: ["Jerusalem", "Ramallah", "Gaza", "Deir el Balah"],
  cIdx: 0,
};

let selectedAnswer = null;

const gameSection = document.getElementById("game");
const startSection = document.getElementById("start");
const qtext = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");

const start = () => {
  startSection.style.display = "none";
  gameSection.style.display = "flex";
  qtext.textContent = QA.q;

  const answers = QA.a
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
    if (index == idx) el.classList.add("selected");
  });
};

const confirm = () => {
  if (typeof selectedAnswer != "number") {
    window.alert("Select answer first");
    return;
  }

  const newAnswers = QA.a
    .map((el, idx) => {
      const correctClassname =
        idx == QA.cIdx ? "correct" : idx == selectedAnswer ? "incorrect" : "";
      return `<li class="option ${correctClassname}" data-index="${idx}" onclick="select(${idx})">${el}</li>`;
    })
    .join("");

  optionsList.innerHTML = newAnswers;
};
