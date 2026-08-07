// ===============================
// Sociology Exam Trainer
// app.js
// ===============================

let currentQuestion = 0;
let hasAnswered = false;
const stats = {
    answered: 0,
    correct: 0
};

// ----------------------
// Navigation
// ----------------------

const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".nav-btn");
const pageTitle = document.getElementById("page-title");

function showPage(pageId) {

    pages.forEach(page => page.classList.remove("active"));

    const page = document.getElementById(pageId);

    if (page) page.classList.add("active");

    navButtons.forEach(btn => btn.classList.remove("active"));

    const activeButton =
        document.querySelector(`[data-page="${pageId}"]`);

    if (activeButton)
        activeButton.classList.add("active");

    pageTitle.textContent =
        pageId.charAt(0).toUpperCase() +
        pageId.slice(1);
}

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        showPage(button.dataset.page);

    });

});

const startButton =
    document.getElementById("startPractice");

if(startButton){

    startButton.onclick = () => {

        showPage("practice");

    }

}

// ----------------------
// Quiz
// ----------------------

function loadQuestion(){

    if(!questions.length) return;

    const q = questions[currentQuestion];

    document.getElementById("questionCategory")
        .textContent = q.category;

    document.getElementById("questionTitle")
        .textContent = q.question;

    const answers =
        document.getElementById("answers");

    answers.innerHTML = "";

hasAnswered = false;
console.log("loadQuestion", hasAnswered);


    q.answers.forEach((answer,index)=>{

        const div =
            document.createElement("div");

        div.className = "answer";

        div.textContent = answer;

        div.onclick = ()=>checkAnswer(index);

        answers.appendChild(div);

    });

}

function checkAnswer(choice){
console.log("checkAnswer körs", choice);
    console.log("before check", hasAnswered);

if(hasAnswered) return;

    hasAnswered = true;

    const q = questions[currentQuestion];

    const answers =
        document.querySelectorAll(".answer");

    stats.answered++;

    answers.forEach((answer,index)=>{

        if(index===q.correct){
            answer.classList.add("correct");
        }

        if(index===choice && choice!==q.correct){
            answer.classList.add("wrong");
        }

        answer.style.pointerEvents="none";

    });

    if(choice===q.correct){
        stats.correct++;
    }

    saveStats();

    updateDashboard();

}

const nextQuestionButton =
    document.getElementById("nextQuestion");

if(nextQuestionButton){

    nextQuestionButton.onclick = ()=>{

        currentQuestion++;

        if(currentQuestion>=questions.length){

            currentQuestion=0;

        }
hasAnswered = false;
        loadQuestion();

    }

}

// ----------------------
// Dashboard
// ----------------------

function updateDashboard(){

    document.getElementById("totalQuestions")
        .textContent = questions.length;

    document.getElementById("answeredQuestions")
        .textContent = stats.answered;

    document.getElementById("correctAnswers")
        .textContent = stats.correct;

    let accuracy = 0;

    if(stats.answered>0){

        accuracy =
            Math.round(
                stats.correct /
                stats.answered *
                100
            );

    }

    document.getElementById("accuracy")
        .textContent = accuracy + "%";

}

// ----------------------
// Local Storage
// ----------------------

function saveStats(){

    localStorage.setItem(
        "sociologyStats",
        JSON.stringify(stats)
    );

}

function loadStats(){

    const saved =
        localStorage.getItem(
            "sociologyStats"
        );

    if(saved){

        const data =
            JSON.parse(saved);

        stats.answered =
            data.answered || 0;

        stats.correct =
            data.correct || 0;

    }

}

// ----------------------
// Theme
// ----------------------

const themeButton =
    document.getElementById("themeToggle");

function loadTheme(){

    const saved =
        localStorage.getItem("theme");

    if(saved==="light"){

        document.body.classList.add("light");

        if(themeButton)
            themeButton.textContent="☀️";

    }

}

function toggleTheme(){

    document.body.classList.toggle("light");

    const light =
        document.body.classList.contains("light");

    if(light){

        localStorage.setItem("theme","light");

        themeButton.textContent="☀️";

    }else{

        localStorage.setItem("theme","dark");

        themeButton.textContent="🌙";

    }

}

if(themeButton){

    themeButton.onclick=toggleTheme;

}

// ----------------------
// Exam Mode
// ----------------------

let timer;
let seconds = 3600;

function updateTimer(){

    const minutes =
        Math.floor(seconds/60);

    const secs =
        seconds%60;

    document.getElementById("timer")
        .textContent =
        String(minutes).padStart(2,"0")
        + ":" +
        String(secs).padStart(2,"0");

}

function startExam(){

    clearInterval(timer);

    seconds = 3600;

    updateTimer();

    timer = setInterval(()=>{

        seconds--;

        updateTimer();

        if(seconds<=0){

            clearInterval(timer);

            alert("⏰ Tiden är slut!");

        }

    },1000);

}

const startExamButton =
    document.getElementById("startExam");

if(startExamButton){

    startExamButton.onclick =
        startExam;

}

// ----------------------
// Chart
// ----------------------

function createChart(){

    const canvas =
        document.getElementById("progressChart");

    if(!canvas) return;

    new Chart(canvas,{

        type:"doughnut",

        data:{

            labels:[
                "Rätt",
                "Fel"
            ],

            datasets:[{

                data:[
                    stats.correct,
                    Math.max(
                        stats.answered-stats.correct,
                        0
                    )
                ]

            }]

        },

        options:{

            responsive:true,

            plugins:{

                legend:{

                    labels:{

                        color:"#ffffff"

                    }

                }

            }

        }

    });

}

// ----------------------
// Init
// ----------------------

window.onload = ()=>{

    loadStats();

    updateDashboard();

    loadQuestion();

    loadTheme();

    createChart();

};
