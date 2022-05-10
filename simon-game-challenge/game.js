// // When the user presses any key on the KeyboardEvent, start the game and change the text to level 1
// // We need a keyboard event listener
// We need a function called start game
//  - change the text to level 1
//  - call the generateNextRandomColor function
// When the user clicks on any of the colors
//   - If the game has not started, call the gameOver function
//   - get the color that was clicked on
//   - check if it was the right color by comparing it with the random color that was generated.
//     - increase the level
//     - call generateNextRandomColor again
//   - if it was the wrong color
//     - call the gameOver function
//       - Red background with animation and  a sound
//       - Change the text to Game Over. Press any key to restart

let randomColor = '';
let gamePattern = [];
document.addEventListener('keypress', gameStart);
const buttons = document.querySelectorAll('.btn');
let level = 1;

function gameStart() {
  level = 1;
  setGameStatus('Level ' + level);
  generateNextRandomColor();
}

function gameStatus() {
  return document.querySelector('#level-title').innerHTML;
}

function generateNextRandomColor() {
  let randomNumber = Math.floor(Math.random() * 4);
  let colors = ['red', 'yellow', 'blue', 'green'];
  randomColor = colors[randomNumber];
  playSoundAndAnimate();
}

function playSoundAndAnimate() {
  let audio = new Audio('sounds/' + randomColor + '.mp3');
  audio.play();
  $('#' + randomColor).animate({ opacity: '0.5' }, 300, function () {
    $('#' + randomColor).animate({ opacity: '1' });
  });
}

function colorClickHandler(event) {
  // if the game has ended, we want to ignore the click
  if (gameStatus().includes('Game Over')) {
    gameOver();
    return;
  }

  if (!randomColor) {
    gameOver();
    return;
  }
  const color = event.target.id;

  checkIfTheRightColorWasClicked(color);
}

function checkIfTheRightColorWasClicked(color) {
  if (color === randomColor) {
    gamePattern.push(color);
    level++;
    generateNextRandomColor();
    setGameStatus('Level ' + level);

    return;
  }

  gameOver();
}

function setGameStatus(status) {
  document.querySelector('#level-title').innerHTML = status;
}

buttons.forEach((button) =>
  button.addEventListener('click', colorClickHandler)
);

function gameOver() {
  setGameStatus('Game Over. Press any key to start');
  document.querySelector('body').classList.add('game-over');
  setTimeout(function () {
    document.querySelector('body').classList.remove('game-over');
  }, 500);
  let audio = new Audio('sounds/wrong.mp3');
  audio.play();
}
