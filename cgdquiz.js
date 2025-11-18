const questions = [
    {
        question: "Qual destes é um indicador chave de desempenho (KPI) em marketing digital?",
        options: ["Taxa de conversão", "Número de funcionários", "Custo do escritório", "Depreciação"],
        correct: 0
    },
    {
        question: "A análise SWOT avalia o quê?",
        options: ["Vendas e Lucros", "Forças, Fraquezas, Oportunidades, Ameaças", "Software e Hardware", "Clientes e Fornecedores"],
        correct: 1
    },
    {
        question: "Quanto custa um pack do pintos?",
        options: ["3€", "2,5€", "1€", "4€"],
        correct: 1
    },
    {
        question: "Em SQL, o que faz o comando SELECT?",
        options: ["Apaga dados", "Insere dados", "Atualiza dados", "Consulta dados"],
        correct: 3
    }
];


let currentQuestionIndex = 0;
let score = 0;
let lives = 3;
let userName = "";


const screens = {
    start: document.getElementById('start-screen'),
    login: document.getElementById('login-screen'),
    menu: document.getElementById('menu-screen'),
    game: document.getElementById('game-screen'),
    gameOver: document.getElementById('game-over-screen')
};


function showScreen(screenName) {
  
    Object.values(screens).forEach(s => s.classList.add('d-none'));
    screens[screenName].classList.remove('d-none');
}


function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    lives = 3;
    updateStats();
    showQuestion();
    showScreen('game');
}

function updateStats() {
   
    let hearts = "";
    for(let i=0; i<lives; i++) hearts += "❤️";
    document.getElementById('lives-display').innerText = hearts;
    document.getElementById('score-display').innerText = "Pontos: " + score;
}

function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endGame(true); 
        return;
    }

    const q = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = q.question;

    const container = document.getElementById('answers-container');
    container.innerHTML = ""; 

    q.options.forEach((opt, index) => {
        const div = document.createElement('div');
        div.className = "col-md-6";
        
        const btn = document.createElement('button');
        btn.className = "btn btn-option-neon";
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index, btn);
        
        div.appendChild(btn);
        container.appendChild(div);
    });
}

function checkAnswer(selectedIndex, btnElement) {
    const q = questions[currentQuestionIndex];
    
    
    const allBtns = document.querySelectorAll('.btn-option-neon');
    allBtns.forEach(b => b.disabled = true);

    if (selectedIndex === q.correct) {
       
        btnElement.classList.add('correct');
        score += 100;
        setTimeout(() => {
            currentQuestionIndex++;
            updateStats();
            showQuestion();
        }, 1000);
    } else {
        
        btnElement.classList.add('incorrect');
        lives--;
        updateStats();
        allBtns[q.correct].classList.add('correct');
        if (lives === 0) {
            setTimeout(() => endGame(false), 1000); 
        } else {
            setTimeout(() => {
                currentQuestionIndex++;
                showQuestion();
            }, 1000);
        }
    }
}

function endGame(win) {
    const msg = win ? "Completaste o Quiz!" : "Ficaste sem vidas!";
    document.getElementById('final-message').innerText = msg;
    document.getElementById('final-score').innerText = score;
    showScreen('gameOver');
}

document.getElementById('play-btn').addEventListener('click', () => showScreen('login'));

document.getElementById('login-btn').addEventListener('click', () => {
    userName = document.getElementById('username-input').value || "Jogador";
    document.getElementById('username-display').innerText = userName;
    showScreen('menu');
});

document.getElementById('back-btn').addEventListener('click', () => showScreen('start'));

document.getElementById('btn-classic').addEventListener('click', startGame);

document.getElementById('restart-btn').addEventListener('click', () => showScreen('menu'));
