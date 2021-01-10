const gameContainer = document.getElementById("game");
const restart = document.querySelector('#restart');
const score = document.querySelector('#score');
const bestScore = document.querySelector('#best-score');

if(localStorage.best){
bestScore.innerText = localStorage.best
  }else{
    bestScore.innerText = 0;
  }

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// start over or restart game

restart.addEventListener('click',function(){
  location.reload();
})

// TODO: Implement this function!

let first = null;
let second = null;
let flipped = 0;
let count = 0;
let isProcessing = false;

let matches = [];

function handleCardClick(event) {
  if(isProcessing){
    return;
  }
  // you can use event.target to see which element was clicked
  
  let clicked = event.target;
  if(clicked.classList.contains('flipped')){
    return;
  }

  console.log(clicked)
  
  // retrieve color from click
  let colorClicked = clicked.classList[0];

  // show color on clicked div
  let colorClass = clicked.classList.add(`${colorClicked}2`);

  
  

  

  // find matches

  if(!first && !second){
    first = clicked;
    first.classList.add('flipped');
  }else if(first  && !second){
    second = clicked;
    second.classList.add('flipped');
    if(first && second){
      if (first.classList[0] == second.classList[0]){
        first.removeEventListener('click', handleCardClick);
        second.removeEventListener('click', handleCardClick);
        matches.push(first);
        if(matches.length == COLORS.length/2){
          setTimeout(function(){alert('Congrats you won!');}, 250);
          restart.innerText = 'New Game';
          if(score < bestScore){
          localStorage.setItem('best', JSON.stringify(count+1))
          }
        }
          first = null;
          second = null;
      }else{
        isProcessing = true;
        setTimeout(function(){
          first.className = first.classList[0];
          second.className = second.classList[0];
          first = null;
          second = null;
          isProcessing = false;
        },1000)
      }
    }
  }

  // keep score

  count++;
  score.innerText = count;
  if(bestScore.innerText == 0){
    score.parentElement.style.color = 'white';
  }else if(parseInt(score.innerText)<parseInt(bestScore.innerText)){
    score.parentElement.style.color = 'green';
  }else if(score.innerText>bestScore.innerText){
    score.parentElement.style.color = 'red';
  }else{
    score.parentElement.style.color = 'white';
  }


}

// when the DOM loads
createDivsForColors(shuffledColors);
