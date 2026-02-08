const quizData = [
    {
        question: "Which language is used for web development?",
        options: ["Python", "JavaScript", "C++", "Java"],
        correct: 1
    },
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlinks Text Mark Language", "None"],
        correct: 0
    },
    {
        question: "What does CSS stand for?",
        options: ["Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets"],
        correct: 1
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Google", "Microsoft", "Netscape", "Oracle"],
        correct: 2
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "#", "<!-- -->", "**"],
        correct: 0
    },
    {
        question: "Which keyword declares a variable?",
        options: ["int", "var", "float", "char"],
        correct: 1
    },
    {
        question: "Which operator checks value and type?",
        options: ["==", "=", "===", "!="],
        correct: 2
    },
    {
        question: "Which tag is used to insert image?",
        options: ["<img>", "<image>", "<pic>", "<src>"],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let userName = "";
let userAnswers = new Array(quizData.length).fill(null);

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");
const resultEl = document.getElementById("result");
const finalScoreEl = document.getElementById("final-score");

function startQuiz() {
    const nameInput = document.getElementById("username").value.trim();
    if (nameInput === "") {
        alert("Please enter your name");
        return;
    }
    userName = nameInput;

    document.getElementById("name-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";

    loadQuestion();
}

function loadQuestion() {
    optionsEl.innerHTML = "";
    feedbackEl.textContent = "";

    const q = quizData[currentQuestion];
    questionEl.textContent = q.question;

    q.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.textContent = option;

        if (userAnswers[currentQuestion] !== null) {
            btn.disabled = true;
            if (index === q.correct) btn.classList.add("correct");
            if (index === userAnswers[currentQuestion] && index !== q.correct)
                btn.classList.add("wrong");
        }

        btn.onclick = () => selectAnswer(btn, index);
        optionsEl.appendChild(btn);
    });

    backBtn.style.display = currentQuestion === 0 ? "none" : "inline-block";
    nextBtn.textContent =
        currentQuestion === quizData.length - 1 ? "Finish" : "Next";
}

function selectAnswer(button, index) {
    if (userAnswers[currentQuestion] !== null) return;

    userAnswers[currentQuestion] = index;
    const correctIndex = quizData[currentQuestion].correct;

    const buttons = optionsEl.querySelectorAll("button");
    buttons.forEach(btn => btn.disabled = true);

    if (index === correctIndex) {
        button.classList.add("correct");
        feedbackEl.textContent = "Correct ✅";
        score++;
    } else {
        button.classList.add("wrong");
        buttons[correctIndex].classList.add("correct");
        feedbackEl.textContent = "Wrong ❌";
    }
}

nextBtn.onclick = () => {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResult();
    }
};

backBtn.onclick = () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
};

function showResult() {
    document.getElementById("quiz-screen").style.display = "none";
    resultEl.style.display = "block";
    finalScoreEl.textContent =
        `${userName}, your score is ${score} out of ${quizData.length}`;
}

document.getElementById("restart-btn").onclick = () => {
    location.reload();
};
