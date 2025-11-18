
const startScreen = document.getElementById('start-screen');
const loginScreen = document.getElementById('login-screen');
const menuScreen = document.getElementById('menu-screen');

const playBtn = document.getElementById('play-btn');
const loginBtn = document.getElementById('login-btn');
const backBtn = document.getElementById('back-btn');

const usernameInput = document.getElementById('username-input');
const usernameDisplay = document.getElementById('username-display');


function showScreen(screenToShow) {
    
    startScreen.classList.add('d-none');
    loginScreen.classList.add('d-none');
    menuScreen.classList.add('d-none');

    
    screenToShow.classList.remove('d-none');
}




playBtn.addEventListener('click', () => {
    showScreen(loginScreen); 
});


loginBtn.addEventListener('click', () => {
  
    const username = usernameInput.value;
    
    usernameDisplay.textContent = username || "Jogador"; 
    
    showScreen(menuScreen); 
});


backBtn.addEventListener('click', () => {
    showScreen(startScreen); 
});