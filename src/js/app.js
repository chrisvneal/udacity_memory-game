"use strict";

const cardDeck = document.querySelector('.deck');

// Array of 8 images for cards
let images = ['robot', 'piggy-bank', 'lightbulb', 'hands-helping', 'crown', 'chess-knight', 'bullhorn', 'bomb', 'robot', 'piggy-bank', 'lightbulb', 'hands-helping', 'crown', 'chess-knight', 'bullhorn', 'bomb'];

// Shuffle images
let shuffledImages = shuffle(images);

// Initiate variable for selected cards
let selectedCards = [];

// modal
const modal = document.querySelector('.modal');

// Establish initial moves made message
let movesMade = 0;
document.querySelector('span.moves').innerHTML = movesMade + " Moves";

let cardsClicked = 0;

let matchesInARow = 0;
let badMatchesInARow = 0;


let starCount = 0;
















/**************************** Functions ****************************/

/********* Timer functions *********/

let gameTimer;
let seconds = 0;
let minutes = 0;
const timeOutput = document.querySelector(".timeOutput");

// startTimer()
function startTimer() {
  gameTimer = setInterval(insertRunningTime, 1000);
}

// stopTimer()
function stopTimer() {
  clearInterval(gameTimer);
  seconds = 0;
  minutes = 0;
}

// Running timer in timer output
function insertRunningTime() {
  seconds++;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  if (seconds >= 60) {
    minutes++;
    seconds = "00";
  }

  // output the time
  timeOutput.innerHTML = `0${minutes}:${seconds}`;
}




/********* Shuffle function (http://stackoverflow.com/a/2450976) *********/

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}





/********* Card clicking functions *********/


function disableCardClicking() {
  cardDeck.removeEventListener('mousedown', flipCard);
}

function enableCardClicks() {
  cardDeck.addEventListener('mousedown', flipCard);
}

// Layout 16 cards in the deck
function layoutCards(cards) {

  // Place cards inside "the deck"
  for (let i = 0; i < images.length; i++) {

    // Create a card (li) with a class of 'card'
    const card = document.createElement('li');
    card.setAttribute('data-image', cards[i]);
    card.classList.add('card');

    // Insert shuffled image in card
    let cardImage = document.createElement('i');
    cardImage.classList.add('fas', 'fa-' + cards[i]);
    card.appendChild(cardImage);

    // Place card in deck
    cardDeck.appendChild(card);
  }

  enableCardClicks();
}

// compare the selected cards
function compareCards(cards) {

  movesMade++;


  if (movesMade > 1) {
    document.querySelector('span.moves').innerHTML = movesMade + " Moves";
  } else {
    document.querySelector('span.moves').innerHTML = movesMade + " Move";
  }

  let cardValue1 = cards[0];
  let cardValue2 = cards[1];

  cardValue1 == cardValue2 ? goodMatch(cards) : badMatch(cards);

  selectedCards.length = 0;
}


// reset timer
function resetTimer() {
  stopTimer();
  timeOutput.innerHTML = "00:00";
}

// reset the game
function resetGame() {
  let shadedStars = document.querySelectorAll('.shaded');

  // reset board
  cardDeck.innerHTML = "";

  // shuffle cards
  shuffledImages = shuffle(shuffledImages);



  // layout cards
  layoutCards(shuffledImages);

  // reset timer
  resetTimer();

  // reset clicked cards
  cardsClicked = 0;

  // reset selected cards array

  selectedCards.length = 0;
  // console.log(selectedCards);


  // reset stars
  for (let star of shadedStars) {
    star.classList.remove('shaded');
  }


  // reset moves made
  movesMade = 0;
  document.querySelector('span.moves').innerHTML = "0 Moves";

  //reset score
  gameScore = 0;
  scoreOutput.innerHTML = gameScore;
}

let resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', resetGame);



// console.log(document.querySelector('.modal-message-header__title').classList);

function displayModal(totalMovesMade, finalScoreOutput, numStarsOutput, gameTimeOutput) {
  document.querySelector('.total-moves').innerHTML = totalMovesMade;
  document.querySelector('.final-score').innerHTML = finalScoreOutput + ' pts';
  document.querySelector('.num-stars').innerHTML = numStarsOutput;
  document.querySelector('.final-game-time').innerHTML = gameTimeOutput;


  modal.classList.add('show', 'flipInX');
  let modalheader = document.querySelector('.modal-message-header__title');
  // console.log(document.querySelector('.modal-message-header__title'));
  modalheader.classList.add('bounceInLeft');
  // document.querySelector('.modal-message-header__title').classList.add('bounceInLeft');

  document.body.addEventListener('click', closeModal);
}

function closeModal() {
  // modal.classList.add('slideOutUp'); // add feature back in if necessary
  modal.classList.remove('show');
}





function gameWon() {
  stopTimer();
  cardsClicked = 0;


  let time = document.querySelector('.timeOutput').textContent;

  displayModal(movesMade, gameScore, starCount, time);



}

// check if won game
function checkIfWon() {
  let matchedCardsLength = document.querySelectorAll('.deck li.matched').length;

  if (matchedCardsLength == 16) {
    gameWon();
  } else {
    enableCardClicks();
  }
}

const scoreOutput = document.querySelector('.scoreOutput');
let gameScore = 0;

// Modal ***************

document.querySelector('.modal-close-button').addEventListener("click", function() {

  closeModal();
});





/********************* Scoring functionality *********************/

// add score when a match is hit
function addScore() {

  // Add 10 points
  gameScore += 10;

  // If the star count is lower than 4 (0-3), apply a star in certain scenarios
  if (starCount < 4) {

    if (gameScore % 20 == 0 && movesMade > 1) {
      shadeStar(starCount);
    }

    if (movesMade == 1) {
      gameScore += 10;
      shadeStar(starCount);
    }
  }

  // output current game score
  scoreOutput.innerHTML = gameScore;
}

// When a good match hits
function goodMatch(cards) {
  badMatchesInARow = 0;

  matchesInARow++;

  // If made 3 matches ina row, get a star; reset matches made in a row to 0
  if (matchesInARow == 3) {
    shadeStar(starCount);
    matchesInARow = 0;
  }

  addScore();

  let cardValue = cards[0];

  let flippedCards = cardDeck.querySelectorAll('.flipped');

  for (let card of flippedCards) {
    if (card.getAttribute('data-image') == cardValue) {
      card.classList.remove('flipped');
      card.classList.add('matched');
    }
  }

  // after a good match, check to see if all 16 cards were matched
  setTimeout(checkIfWon, 100);
}

// When a bad match hits
function badMatch(cards) {
  if (gameScore % 5 == 0 && gameScore >= 5) {
    gameScore -= 5;
    scoreOutput.innerHTML = gameScore;
  }

  // increase bad match count
  badMatchesInARow++; // increase bad match

  // reset good matches
  matchesInARow = 0;

  // reset bad matches after all 3 consecutive bad matches
  if (badMatchesInARow == 3 && starCount > 0) {
    unshadeStar();
    badMatchesInARow = 0;
  }

  let cardValue1 = cards[0];
  let cardValue2 = cards[1];

  // Turn the card around if the values do not match
  setTimeout(function() {
    let flippedCards = cardDeck.querySelectorAll('.flipped');

    for (let card of flippedCards) {
      if (card.getAttribute('data-image') == cardValue1 || card.getAttribute('data-image') == cardValue2) {
        card.classList.remove('open', 'show', 'flipped');
      }
    }

    // enable clicking on cards
    enableCardClicks();
  }, 800);
}

// shade a star
function shadeStar(next) {
  let stars = document.querySelectorAll('.fa-star.rating');

  stars[next].classList.add('shaded');

  // increase star count
  starCount++;
}

// unshade a star
function unshadeStar() {
  let shadedStars = document.querySelectorAll('.fa-star.rating.shaded');

  shadedStars[(starCount - 1)].classList.remove('shaded');

  // lower starCount
  starCount--;
}

/********************* Card flipping functionality *********************/

function flipCard(evt) {
  let clickedCard = evt.target;

  cardsClicked++;

  // cannot click a card that has already been matched
  if (clickedCard.classList.contains('matched')) {
    return;
  }

  // start timer as soon as the first card is clicked
  if (cardsClicked == 1) {
    startTimer();
  }

  // if the target ckicked is an 'LI' element...
  if (clickedCard.nodeName == 'LI') {

    // ...flip card and show symbol
    clickedCard.classList.add('open', 'show', 'flipped');

    // ..put the card's value in the selected card's array
    let cardAttribute = clickedCard.getAttribute('data-image');
    selectedCards.push(cardAttribute);

    // If the selectedCard's array length hits 2, lock clicking functionality and compare the 2 values
    if (selectedCards.length == 2) {
      disableCardClicking();

      compareCards(selectedCards);
    }
  }
}

/************** Start of Memory Game **************/
window.onload = layoutCards(shuffledImages);