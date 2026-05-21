// Elementos da UI
const elApp = document.getElementById('app');
const elInicio = document.getElementById('inicio');
const elQuiz = document.getElementById('quiz');
const elResultado = document.getElementById('resultado');
const btnIniciar = document.getElementById('btnIniciar');
const btnToggleTheme = document.getElementById('btnToggleTheme');
const elPergunta = document.getElementById('pergunta');
const elOpcoes = document.getElementById('opcoes');
const elProgressoText = document.getElementById('progresso-text');
const elProgressoBar = document.getElementById('progresso-bar');
const elTimerDisplay = document.getElementById('timer-display');
const elHighScore = document.getElementById('high-score-display');
const elCategory = document.getElementById('category');
const elDifficulty = document.getElementById('difficulty');
const elPerguntaContainer = document.getElementById('pergunta-container');

// Estado da Aplicação
const gameState = {
    perguntas: [],
    atual: 0,
    pontos: 0,
    timeLeft: 20,
    timerId: null,
    category: 'any',
    difficulty: 'any'
};

// Funções de Inicialização e Configuração
function init() {
    loadHighScore();
    setupEventListeners();
}

function setupEventListeners() {
    btnToggleTheme.addEventListener('click', toggleTheme);
    btnIniciar.addEventListener('click', iniciarJogo);
    elOpcoes.addEventListener('click', handleOptionClick);
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

// Persistência de Recorde
function loadHighScore() {
    const score = localStorage.getItem('quiz_highscore');
    if (score) {
        elHighScore.textContent = `Recorde: ${score}`;
    }
}

function saveHighScore(score) {
    const currentScore = localStorage.getItem('quiz_highscore') || 0;
    if (score > parseInt(currentScore)) {
        localStorage.setItem('quiz_highscore', score);
        return true;
    }
    return false;
}

// Helpers de Pergunta
function embaralhar(array) {
    return array.sort(() => Math.random() - 0.5);
}

function getAlternativas(pergunta) {
    const todas = [...pergunta.incorrect_answers, pergunta.correct_answer];
    return embaralhar(todas);
}

// Fluxo do Jogo
async function buscarPerguntas() {
    gameState.category = elCategory.value;
    gameState.difficulty = elDifficulty.value;
    
    let url = 'https://tryvia.ptr.red/api.php?amount=10&type=multiple';
    
    if (gameState.category !== 'any') {
        url += `&category=${gameState.category}`;
    }
    if (gameState.difficulty !== 'any') {
        url += `&difficulty=${gameState.difficulty}`;
    }

    btnIniciar.textContent = 'Carregando...';
    btnIniciar.disabled = true;

    try {
        const res = await fetch(url);
        const data = await res.json();
        gameState.perguntas = data.results;
        iniciarQuizFlow();
    } catch (erro) {
        console.log('Erro:', erro);
        alert('Erro ao carregar perguntas. Tente novamente.');
    } finally {
        btnIniciar.textContent = 'Iniciar';
        btnIniciar.disabled = false;
    }
}

function iniciarJogo() {
    gameState.atual = 0;
    gameState.pontos = 0;
    buscarPerguntas();
}

function iniciarQuizFlow() {
    elInicio.hidden = true;
    elResultado.hidden = true;
    elQuiz.hidden = false;
    exibirPergunta();
}

// Lógica de Timer
function iniciarTimer() {
    clearInterval(gameState.timerId);
    gameState.timeLeft = 20;
    elTimerDisplay.textContent = `Tempo: ${gameState.timeLeft}s`;
    
    gameState.timerId = setInterval(() => {
        gameState.timeLeft--;
        elTimerDisplay.textContent = `Tempo: ${gameState.timeLeft}s`;
        
        if (gameState.timeLeft <= 0) {
            clearInterval(gameState.timerId);
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
     // Marcar erro automaticamente
     const botoes = elOpcoes.querySelectorAll('.opcao');
     const correta = gameState.perguntas[gameState.atual].correct_answer;
     
     botoes.forEach(btn => {
         btn.disabled = true;
         if(btn.innerHTML === correta) { // Use innerHTML since API returns entities
             btn.classList.add('correta');
         }
     });
     
     avancarPergunta();
}

// Exibição de Perguntas e Respostas
function exibirPergunta() {
  const p = gameState.perguntas[gameState.atual];
  const alternativas = getAlternativas(p);

  // Atualizar progresso visual
  const progressPct = ((gameState.atual) / gameState.perguntas.length) * 100;
  elProgressoBar.style.width = `${progressPct}%`;
  elProgressoText.textContent = `Pergunta ${gameState.atual + 1} de ${gameState.perguntas.length}`;

  // Exibir pergunta com animação
  elPerguntaContainer.classList.remove('fade-in');
  void elPerguntaContainer.offsetWidth; // trigger reflow
  elPerguntaContainer.classList.add('fade-in');
  
  elPergunta.innerHTML = p.question;

  // Criar botões para cada alternativa
  elOpcoes.innerHTML = '';
  alternativas.forEach((alt) => {
    const btn = document.createElement('button');
    btn.innerHTML = alt;
    btn.className = 'opcao';
    elOpcoes.appendChild(btn);
  });
  
  iniciarTimer();
}

function handleOptionClick(e) {
    if (!e.target.classList.contains('opcao')) return;

    clearInterval(gameState.timerId); // Stop timer

    const resposta = e.target.innerHTML; // Use innerHTML because API might have entities
    const correta = gameState.perguntas[gameState.atual].correct_answer;

    // Desabilitar botões
    const botoes = elOpcoes.querySelectorAll('.opcao');
    botoes.forEach(btn => btn.disabled = true);

    if (resposta === correta) {
      gameState.pontos++;
      e.target.classList.add('correta');
    } else {
      e.target.classList.add('errada');
      // Highlight correct one too
      botoes.forEach(btn => {
          if(btn.innerHTML === correta) {
              btn.classList.add('correta');
          }
      });
    }

    avancarPergunta();
}

function avancarPergunta() {
    setTimeout(() => {
      gameState.atual++;
      if (gameState.atual < gameState.perguntas.length) {
        exibirPergunta();
      } else {
        exibirResultado();
      }
    }, 1500); // 1.5s delay to see the result
}

function exibirResultado() {
  elQuiz.hidden = true;
  elResultado.hidden = false;

  const total = gameState.perguntas.length;
  const pct = Math.round((gameState.pontos / total) * 100);

  let msg = 'Tente novamente!';
  if (pct >= 80) msg = 'Excelente!';
  else if (pct >= 60) msg = 'Bom trabalho!';

  const isNewHighScore = saveHighScore(gameState.pontos);
  loadHighScore(); // Update start screen

  let recordMsg = isNewHighScore ? '<p><strong>🎉 Novo Recorde! 🎉</strong></p>' : '';

  elResultado.innerHTML = `
    <h2>${msg}</h2>
    <p>Você acertou ${gameState.pontos} de ${total} perguntas (${pct}%)</p>
    ${recordMsg}
    <button id="btnReiniciar">Jogar novamente</button>
  `;
  
  document.getElementById('btnReiniciar').addEventListener('click', () => {
      elResultado.hidden = true;
      elInicio.hidden = false;
  });
}

// Iniciar app
init();
