let randomNumber = parseInt((Math.random())*100 + 1) ;

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField') ;
const guessSlot = document.querySelector('.guesses') ;
const remaining = document.querySelector('.lastResult');
const lowOrHigh = document.querySelector('.lowOrHi') ;
const startOver = document.querySelector('.resultParas') ;

const p = document.createElement('p');

let prevGuess = [] ;
let numGuess = 1;

let playGame = true ;

if(playGame){
    submit.addEventListener('click', function(e){
        e.preventDefault();
        const guess = parseInt(userInput.value)
        validGuess(guess);
    })
}

function validGuess(guess){
    if(isNaN(guess)){
        alert(`Please enter a valid guess`);
    }
    else if(guess < 0 || guess > 100){
        alert(`Please enter a valid guess`);
    }
    else{
        prevGuess.push(guess);
        displayGuess(guess);
        if(numGuess === 11 ){
            displayMessage(`Game Over. Random Number was ${randomNumber}`);
            endGame();
        }
        else{
            checkGuess(guess);
        }
    }    
}

function checkGuess(guess){
    if(guess === randomNumber){
        displayMessage(`You guessed it right`);
        endGame();
    }
    else if(guess < randomNumber){
        displayMessage(`Number is too low`) ;
    }
    else{
        displayMessage(`Number id too high`) ;
    }
}

function displayGuess(guess){
    userInput.value = '' ;
    guessSlot.innerHTML += `${guess} ,` ;
    numGuess++ ;
    remaining.innerHTML = `${11 - numGuess}`
}

function displayMessage(message){
    lowOrHigh.innerHTML = `<h2>${message}</h2>` ;
}

function endGame(){
    userInput.value= '' ;
    userInput.setAttribute('disabled', '')
    p.classList.add('button')
    p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;
    startOver.appendChild(p)
    playGame = false 
    newGame()
}

function newGame(){
    const newGameButton = document.querySelector('#newGame')
    newGameButton.addEventListener('click', function(e){
        randomNumber = parseInt((Math.random())*100 + 1) ;
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = ''
        remaining.innerHTML = `${11 - numGuess}`
        userInput.removeAttribute('disabled')
        startOver.removeChild(p);
        playGame = true;
    })
}