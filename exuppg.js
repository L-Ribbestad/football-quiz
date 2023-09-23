let questionArr = [
    {
        question: "Ronaldinho har spelat i vilka av följande klubbar?",
        answers:[
            {text: "PSG", correct: true},
            {text: "Milan", correct: true},
            {text: "Barcelona", correct: true},
            {text: "Marseille", correct: false}
        ]    
    },
    {
        question: "Maradona har spelat i vilka av följande klubbar?",
        answers:[
            {text: "Barcelona", correct: true},
            {text: "River Plate", correct: false},
            {text: "Sevilla", correct: true},
            {text: "Napoli", correct: true}
        ]
    },
    {
        question: "Mohamed Salah har tidigare spelat för Chelsea.",
        answers:[
            {text: "Sant", correct: true},
            {text: "Falskt", correct: false}
        ]
    },
    {
        question: "Old Trafford är namnet på Chelseas arena.",
        answers:[
            {text: "Sant", correct: false},
            {text: "Falskt", correct: true}
        ]    
    },
    {
        question: "Erling Haaland har rekordet för flest gjorda mål under en premier league säsong.",
        answers:[
            {text: "Sant", correct: true},
            {text: "Falskt", correct: false}
        ]    
    },
    {
        question: "Arsenal kallas även för The Gunners.",
        answers:[
            {text: "Sant", correct: true},
            {text: "Falskt", correct: false}
        ]    
    },
    {
        question: "Vem har gjort flest mål för Manchester United?",
        answers:[
            {text: "Wayne Rooney", correct: true},
            {text: "Cristiano Ronaldo", correct: false},
            {text: "Ruud Van Nistelrooy", correct: false},
            {text: "Robin Van Persie", correct: false},
        ]    
    },
    {
        question: "Vilken Premier League-klubb har Romelu Lukaku inte spelat för?",
        answers:[
            {text: "Everton", correct: false},
            {text: "Manchester United", correct: false},
            {text: "Chelsea", correct: false},
            {text: "Crystal Palace", correct: true},
        ]    
    },
    {
        question: "Vem blev Man Citys bästa målskytt i ligan under säsongen 2013/2014 med 20 mål?",
        answers:[
            {text: "Roque Santa Cruz", correct: false},
            {text: "Sergio Aguero", correct: false},
            {text: "David Silva", correct: false},
            {text: "Yaya Toure", correct: true},
        ]    
    },
    {
        question: "Vem har gjort flest mål i Premier Leagues historia?",
        answers:[
            {text: "Sergio Aguero", correct: false},
            {text: "Wayne Rooney", correct: false},
            {text: "Alan Shearer", correct: true},
            {text: "Harry Kane", correct: false}
        ]    
    },
]

const questionText = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;
let currentQuestion;

function startQuiz(){
    questionText.style.color = "#001e4d";
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Nästa";
    renderQuestion();
}

function renderQuestion(){
    resetState();
    currentQuestion = questionArr[currentQuestionIndex];
    let questionNum = currentQuestionIndex + 1;
    let amountCorrectAnswers = 0;
    questionText.innerHTML = questionNum + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        if(answer.correct === true){
            amountCorrectAnswers++;
        }
    })

    currentQuestion.answers.forEach(answer => {
        if(amountCorrectAnswers === 1){
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            answerButtons.appendChild(button);
            if(answer.correct){
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectedAnswer)
        }else{
            const checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox", "#checkbox", "value");
            let label = document.createElement("label");
            checkbox.value = answer.text;
            label.innerHTML = answer.text;
            label.for = "checkbox";
            answerButtons.appendChild(label);
            answerButtons.appendChild(checkbox);
            if(answer.correct){
                checkbox.dataset.correct = answer.correct;
            }
            checkbox.addEventListener("change", checkboxAnswer)
        }
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function checkboxAnswer(e) {
    let amountCheckedBox = 0;
    let availableCorrectAnswers = 0;
    let amountCorrectAnswers = 0;
    let answers = [];
    const selectedBox = e.target;
    const isCorrect = selectedBox.dataset.correct === "true"; 
    nextButton.style.display = "block";

    Array.from(answerButtons.children).forEach(checkbox => {
        if (checkbox.checked) {
            amountCheckedBox++;
            answers.push(checkbox);
        }
        if (checkbox.dataset.correct === "true") {
            availableCorrectAnswers++;
        }
    });

    answers.forEach(answer => {
        if(answer.dataset.correct === "true"){
            amountCorrectAnswers++
        }
    })

    if(amountCorrectAnswers === availableCorrectAnswers){
        score++
    };

    if (amountCheckedBox === availableCorrectAnswers) {
        Array.from(answerButtons.children).forEach(checkbox => {
            if (checkbox.checked && checkbox.dataset.correct === "true") {
                checkbox.previousSibling.classList.add("correctCheckbox");
            } else if (checkbox.checked && checkbox.dataset.correct !== "true"){
                checkbox.previousSibling.classList.add("incorrectCheckbox");
            }
            checkbox.disabled = true;
        });
    }
}

function selectedAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showResults(){
    resetState();
    if(score > questionArr.length * 0.75){
        questionText.innerHTML = `Mycket väl godkänd: ${score}/${questionArr.length}!`;
        questionText.style.color = "green";
    }else if(score > questionArr.length * 0.5){
        questionText.innerHTML = `Godkänd: ${score}/${questionArr.length}!`;
        questionText.style.color = "orange";
    }else{
        questionText.innerHTML = `Icke godkänd: ${score}/${questionArr.length}!`;
        questionText.style.color = "red";
    }
    nextButton.innerHTML = "Kör Igen";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questionArr.length){
        renderQuestion();
    }else{
        showResults();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questionArr.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();



