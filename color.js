// let timer = document.getElementsByClassName("timer");
// let quizContainer = document.getElementById("container");
// let nextButton = document.getElementById("next-button");
// let numOfQuestions = document.getElementsByClassName("number-of-questions");
// let displayContainer = document.getElementById("display-container");
// let scoreContainer = document.querySelector(".score-container");
// let restart = document.getElementById("restart");
// let userScore = document.getElementById("user-score");
// let startscreen = document.getElementsByClassName("start-screen");
// let startbutton = document.getElementById("start-button");
// let questionCount;
// let scoreCount = 0;
// count = 10;
// countdown;
// let letters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
// let quizArray = [];
// const generateRandomValue = (array) => array[Math.floor(Math.random()* array.length)];
// function colorGenerator(){
//     newColor = "#";     
//     for( let n = 1; n < 6; n++){
//         let expectedLength = 4;
//         while(optionsArray.length < expectedLength){
//             optionsArray.push(generateRandomValue())
//         }
//     }
//     if (questionCount == quizArray.length){
//         displayContainer.classList.add("hide");
//         scoreContainer.classList.remove("hide");
//         userScore.innerHTML = `Your score is ${scoreCount} out of ${questionCount}`
//     }else{
//         numOfQuestions.innerHTML = questionCount + 1  + " Of " + quizArray.length + " Question";
//         displayContainer(questionCount);
//         count = 10;
//         clearInterval(countdown);
//         timerDisplay();
//     }
//     nextButton.classList.add("hide");   
// };
// // const displayContainer

const startButton = document.getElementById('start-button');
const gameArea = document.getElementById('game-area');
const colorCodeDisplay = document.getElementById('color-code');
const colorBoxes = document.querySelectorAll('.color-box');
const timerDisplay = document.getElementById('time');
const message = document.getElementById('message');

let correctColor;
let countdown;
let timeLeft = 10;

startButton.addEventListener('click', startGame);

function startGame() {
  // Show game area and hide start button
  gameArea.classList.remove('hide');
  startButton.classList.add('hide');
  message.textContent = '';

  generateColors();

 
  startTimer();
}

function generateColors() {
  let colors = [];
  for (let i = 0; i < 3; i++) {
    colors.push(generateRandomColor());
    colorBoxes[i].style.backgroundColor = colors[i];
  }

  
  correctColor = colors[Math.floor(Math.random() * colors.length)];
  colorCodeDisplay.textContent = correctColor;

  
  colorBoxes.forEach((box) => {
    box.addEventListener('click', function () {
      checkColor(this.style.backgroundColor);
    });
  });
}


function checkColor(selectedColor) {
  const selectedHexColor = rgbToHex(selectedColor);
  if (selectedHexColor === correctColor) { 
    message.textContent = 'You Win!';
    clearInterval(countdown);
    resetGame();
  } else {
    message.textContent = 'Wrong color! Try again!';
  }
}

function rgbToHex(rgb) {
  let rgbValues = rgb.replace('rgb(', '').replace(')', '').split(', ');
  let hexColor = '#';
  for (let i = 0; i < 3; i++) {
    let hex = parseInt(rgbValues[i]).toString(16);
    hexColor += hex.length == 1 ? '0' + hex : hex;
  }
  return hexColor.toUpperCase();
}


  function startTimer() {
    timeLeft = 10;
    timerDisplay.textContent = timeLeft;
    countdown = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
  
      if (timeLeft === 0) {
        clearInterval(countdown);
        message.textContent = 'Time is up! You lost!';
        resetGame();
      }
    }, 1000);
  }

  function resetGame() {
    gameArea.classList.add('hide');
    startButton.classList.remove('hide');

    
  colorBoxes.forEach((box) => {
    box.replaceWith(box.cloneNode(true));
  });
}

function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
