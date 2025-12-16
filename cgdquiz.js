var todasPerguntas = {}; 
var perguntasAtuais = [];
var indiceAtual = 0;
var pontuacao = 0;
var vidas = 3;
var nomeJogador = "Estudante";
var modoJogo = ""; 
var tempo = 0;
var cronometro = null;
var combo = 0; 

const premios = [
    100, 200, 300, 500, 1000,       
    2000, 4000, 8000, 16000, 32000, 
    64000, 125000, 250000, 500000, 1000000 
];

const premiosRapido = [
    100, 500, 2500, 10000, 50000
];

console.log("JS carregado. Modo Rápido atualizado!");

document.addEventListener('DOMContentLoaded', function() {
    
    fetch('perguntas.php')
        .then(function(res) { return res.json(); })
        .then(function(data) {
            todasPerguntas = data; 
            console.log("Perguntas recebidas!");
        })
        .catch(function(err) {
            console.log("Erro ao carregar perguntas. Verifica o PHP.", err);
        });

    
    document.getElementById('play-btn').onclick = function() {
        mudarEcran('login-screen');
    };

    document.getElementById('login-btn').onclick = function() {
        var inputNome = document.getElementById('username-input').value;
        if(inputNome) {
            nomeJogador = inputNome;
        }
        document.getElementById('username-display').innerText = nomeJogador;
        
        mudarEcran('menu-screen');
        atualizarLeaderboard(); 
    };

    document.getElementById('back-btn').onclick = function() { mudarEcran('start-screen'); };
    document.getElementById('back-menu-btn').onclick = function() { mudarEcran('menu-screen'); };
    document.getElementById('restart-btn').onclick = function() { 
        mudarEcran('menu-screen');
        atualizarLeaderboard();
    };

    document.getElementById('btn-classic').onclick = function() { iniciarJogo('classic'); };
    document.getElementById('btn-time').onclick = function() { iniciarJogo('time'); };
    document.getElementById('btn-fast').onclick = function() { iniciarJogo('fast'); }; 

    document.getElementById('btn-categories').onclick = function() {
        if (Object.keys(todasPerguntas).length === 0) {
            alert("As perguntas ainda estão a carregar... Tenta já!");
            return;
        }

        var container = document.getElementById('categories-container');
        container.innerHTML = ""; 
        
        var nomesCat = {
            gestao: "Gestão",
            graficos: "Gráficos",
            programacao: "Programação",
            vidaAcademica: "Vida Académica"
        };

        for (var key in todasPerguntas) {
            var div = document.createElement('div');
            div.className = "col-6 d-grid";
            var btn = document.createElement('button');
            btn.className = "btn btn-menu-neon";
            btn.innerText = nomesCat[key] || key;
            
            (function(k) {
                btn.onclick = function() { iniciarJogo('category', k); };
            })(key);

            div.appendChild(btn);
            container.appendChild(div);
        }
        mudarEcran('category-screen');
    };

    document.getElementById('next-question-btn').onclick = function() {
        indiceAtual++;
        if (indiceAtual >= perguntasAtuais.length) {
            fimDeJogo(true);
        } else {
            mudarEcran('game-screen');
            mostrarPergunta();
        }
    };
});


function mudarEcran(idEcran) {
    var screens = document.querySelectorAll('.game-container > div');
    screens.forEach(function(s) { s.classList.add('d-none'); });
    var ecran = document.getElementById(idEcran);
    if(ecran) ecran.classList.remove('d-none');
}

function misturarArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function iniciarJogo(modo, categoria = null) {
    if (Object.keys(todasPerguntas).length === 0) {
        alert("Erro: BD vazia.");
        return;
    }

    modoJogo = modo;
    pontuacao = 0;
    indiceAtual = 0;
    combo = 0;
    perguntasAtuais = [];


    if (modo === 'classic') {
        vidas = 1; 
        var facil = [], medio = [], dificil = [];
        for (var cat in todasPerguntas) {
            facil = facil.concat(todasPerguntas[cat].facil);
            medio = medio.concat(todasPerguntas[cat].medio);
            dificil = dificil.concat(todasPerguntas[cat].dificil);
        }
        misturarArray(facil); misturarArray(medio); misturarArray(dificil);
        perguntasAtuais = facil.slice(0,5).concat(medio.slice(0,5)).concat(dificil.slice(0,5));
    
    } else if (modo === 'fast') {
        vidas = 1; 
        var facil = [], medio = [], dificil = [];
        for (var cat in todasPerguntas) {
            facil = facil.concat(todasPerguntas[cat].facil);
            medio = medio.concat(todasPerguntas[cat].medio);
            dificil = dificil.concat(todasPerguntas[cat].dificil);
        }
        misturarArray(facil); misturarArray(medio); misturarArray(dificil);
        perguntasAtuais = facil.slice(0,2).concat(medio.slice(0,2)).concat(dificil.slice(0,1));

    } else if (modo === 'category' && categoria) {
        vidas = 3;
        var c = todasPerguntas[categoria];
        perguntasAtuais = [].concat(c.facil, c.medio, c.dificil);
        misturarArray(perguntasAtuais);

    } else {
        vidas = 3;
        for (var cat in todasPerguntas) {
            var c = todasPerguntas[cat];
            perguntasAtuais = perguntasAtuais.concat(c.facil, c.medio, c.dificil);
        }
        misturarArray(perguntasAtuais);
    }

    atualizarHUD();

    mudarEcran('game-screen');
    mostrarPergunta();
    
}

function mostrarPergunta() {
    if (indiceAtual >= perguntasAtuais.length) {
        fimDeJogo(true);
        return;
    }

    var q = perguntasAtuais[indiceAtual];
    document.getElementById('question-text').innerText = q.question;

    var areaRespostas = document.getElementById('answers-container');
    areaRespostas.innerHTML = ""; 

    q.options.forEach(function(opt, index) {
        var div = document.createElement('div');
        div.className = "col-md-6";
        var btn = document.createElement('button');
        btn.className = "btn btn-option-neon";
        btn.innerText = opt;
        btn.onclick = function() { verificarResposta(index, btn); };
        div.appendChild(btn);
        areaRespostas.appendChild(div);
    });

    atualizarHUD(); 
    
    var display = document.getElementById('timer-display');

    if (modoJogo === 'time') {
        clearInterval(cronometro);
        tempo = 10; 
        atualizarDisplayTempo();
        iniciarTimerPergunta();
    } 
    else if (modoJogo === 'classic' || modoJogo === 'fast') {
        var listaPremios = (modoJogo === 'fast') ? premiosRapido : premios;
        var valor = listaPremios[indiceAtual] || 0;
        
        var valorTxt = new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(valor);
        display.innerText = "A jogar para: " + valorTxt;
        display.className = "text-info fw-bold fs-5"; 
    } 
    else {
        display.innerText = ""; 
    }
}

function desenharEscada() {
    var lista = document.getElementById('ladder-list');
    var totalDisplay = document.getElementById('ladder-total-display');
    lista.innerHTML = "";

    var totalTxt = new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(pontuacao);
    if (totalDisplay) totalDisplay.innerText = totalTxt;

    var listaPremios = (modoJogo === 'fast') ? premiosRapido : premios;

    for (var i = listaPremios.length - 1; i >= 0; i--) {
        var valor = listaPremios[i];
        var div = document.createElement('div');
        div.className = "ladder-step";
        
        var valorF = new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(valor);
        div.innerHTML = "<span>● " + valorF + "</span>";

        if (i === indiceAtual) div.classList.add('active'); 
        else if (i < indiceAtual) div.classList.add('passed');
        else div.classList.add('future');

        lista.appendChild(div);
    }
    mudarEcran('ladder-screen');
}

function verificarResposta(indexEscolhido, btnClicado) {
    var q = perguntasAtuais[indiceAtual];
    var todosBtns = document.querySelectorAll('.btn-option-neon');
    todosBtns.forEach(function(b) { b.disabled = true; });

    if (modoJogo === 'time') clearInterval(cronometro);

    if (indexEscolhido === q.correct) {
        btnClicado.classList.add('correct');
        combo++; 

        if (modoJogo === 'classic' || modoJogo === 'fast') {
            var listaPremios = (modoJogo === 'fast') ? premiosRapido : premios;
            pontuacao += listaPremios[indiceAtual];
            
            setTimeout(function() { desenharEscada(); }, 1000);
            return; 
        } 
        else if (modoJogo === 'time') {
            var base = tempo * 100;
            var mult = (combo >= 4) ? 2.0 : (combo === 3 ? 1.5 : (combo === 2 ? 1.2 : 1.0));
            pontuacao += Math.round(base * mult);
        } else {
            pontuacao++;
        }

        setTimeout(function() {
            indiceAtual++;
            atualizarHUD();
            if (indiceAtual >= perguntasAtuais.length) fimDeJogo(true);
            else mostrarPergunta();
        }, 1000);

    } else {
        btnClicado.classList.add('incorrect');
        combo = 0; 
        vidas--;
        atualizarHUD();
        todosBtns[q.correct].classList.add('correct');

        if (vidas === 0 || modoJogo === 'classic' || modoJogo === 'fast') {
            setTimeout(function() { fimDeJogo(false); }, 1000); 
        } else {
            setTimeout(function() {
                indiceAtual++;
                if (indiceAtual >= perguntasAtuais.length) fimDeJogo(true);
                else mostrarPergunta();
            }, 1000);
        }
    }
}

function atualizarHUD() {
    var divVidas = document.getElementById('lives-display');
    var divScore = document.getElementById('score-display');

    if (modoJogo === 'classic' || modoJogo === 'fast') {
        divVidas.innerHTML = ""; 
    } else {
        var coracoes = "";
        for(var i=0; i<vidas; i++) coracoes += "❤️";
        divVidas.innerText = coracoes;
    }
    
    if (modoJogo === 'classic' || modoJogo === 'fast') {
        var pts = new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(pontuacao);
        divScore.innerText = "Total: " + pts;
        divScore.className = "text-warning fw-bold";
    } else {
        var fogo = "";

        if (modoJogo === 'time' && combo > 1) {
            fogo = " 🔥x" + combo;
        }

        divScore.innerText = "Pontos: " + pontuacao + fogo;
        divScore.className = "text-white";
    }
}

function atualizarDisplayTempo() {
    var d = document.getElementById('timer-display');
    if(!d || modoJogo === 'classic' || modoJogo === 'fast') return;
    
    d.innerText = "⏰ " + tempo + "s";
    if (tempo <= 3) d.className = "text-danger fw-bold fs-4";
    else d.className = "text-white fw-bold fs-4";
}

function iniciarTimerPergunta() {
    cronometro = setInterval(function() {
        tempo--;
        atualizarDisplayTempo();
        if (tempo <= 0) {
            clearInterval(cronometro);
            tempoEsgotado();
        }
    }, 1000);
}

function tempoEsgotado() {
    vidas--;
    combo = 0; 
    atualizarHUD();
    if (vidas === 0) fimDeJogo(false);
    else {
        indiceAtual++;
        if (indiceAtual >= perguntasAtuais.length) fimDeJogo(true);
        else mostrarPergunta();
    }
}

function fimDeJogo(completou) {
    clearInterval(cronometro);

    guardarRecorde(nomeJogador, pontuacao);

    var msg = "";
    if (modoJogo === 'classic' || modoJogo === 'fast') {
        var maxP = (modoJogo === 'fast') ? 5 : 15;
        if (completou && indiceAtual >= maxP) msg = "PARABÉNS! LIMPASTE O PRÉMIO MÁXIMO! 🏆";
        else if (completou) msg = "Ganhaste!";
        else msg = "Perdeste tudo... 💸";
    } else {
        if (completou) msg = "Quiz Completo!";
        else msg = "Game Over!";
    }

    document.getElementById('final-message').innerText = msg;
    
    var valorFinal = pontuacao;
    if(modoJogo === 'classic' || modoJogo === 'fast') {
        valorFinal = new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(pontuacao);
    }
    document.getElementById('final-score').innerText = valorFinal;
    
    mudarEcran('game-over-screen');
}

function guardarRecorde(nome, pontos) {
    if (modoJogo !== 'time') return; 

    fetch('guardarscore.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nome, pontos: pontos, modo: modoJogo })
    })
    .then(function(res) { return res.json(); })
    .then(function(d) { console.log("Guardado:", d.mensagem); })
    .catch(function(e) { console.log("Erro ao guardar", e); });
}

function atualizarLeaderboard() {
    var lista = document.getElementById('leaderboard-list');
    
    fetch('obter_leaderboard.php')
    .then(function(res) { return res.json(); })
    .then(function(data) {
        lista.innerHTML = ""; 
        if(data.length === 0) {
            lista.innerHTML = "<li class='text-muted'>Sem recordes.</li>";
            return;
        }
        data.forEach(function(player, i) {
            var icone = (i+1) + ". ";
            if (i === 0) icone = "🥇 ";
            if (i === 1) icone = "🥈 ";
            if (i === 2) icone = "🥉 ";

            var li = document.createElement('li');
            li.className = "mb-2 text-white";
            li.style.borderBottom = "1px solid rgba(255,255,255,0.1)";
            li.innerHTML = "<span class='fw-bold text-warning'>" + icone + player.nome_utilizador + "</span>" + 
                           "<span class='float-end'>" + player.pontuacao + " pts</span>";
            lista.appendChild(li);
        });
    })
    .catch(function(e) { console.log("Leaderboard offline."); });
}
