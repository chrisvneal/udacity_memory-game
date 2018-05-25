"use strict";

var cardDeck = document.querySelector('.deck');

// Array of 8 images for cards
var images = ['robot', 'piggy-bank', 'lightbulb', 'hands-helping', 'crown', 'chess-knight', 'bullhorn', 'bomb', 'robot', 'piggy-bank', 'lightbulb', 'hands-helping', 'crown', 'chess-knight', 'bullhorn', 'bomb'];

// Shuffle images
var shuffledImages = shuffle(images);

// Initiate variable for selected cards
var selectedCards = [];

// modal
var modal = document.querySelector('.modal');

// Establish initial moves made message
var movesMade = 0;
document.querySelector('span.moves').innerHTML = movesMade + " Moves";

var cardsClicked = 0;

var matchesInARow = 0;
var badMatchesInARow = 0;

var starCount = 0;

var scoreOutput = document.querySelector('.scoreOutput');
var gameScore = 0;

var resetButton = document.querySelector('.reset');

/**************************** Functions ****************************/

/********* Timer functions *********/

var gameTimer = void 0;
var seconds = 0;
var minutes = 0;
var timeOutput = document.querySelector(".timeOutput");

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
    seconds = '0' + seconds;
  }

  if (seconds >= 60) {
    minutes++;
    seconds = "00";
  }

  // output the time
  timeOutput.innerHTML = '0' + minutes + ':' + seconds;
}

/********* Shuffle function (http://stackoverflow.com/a/2450976) *********/

function shuffle(array) {
  var currentIndex = array.length,
      temporaryValue,
      randomIndex;

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
  for (var i = 0; i < images.length; i++) {

    // Create a card (li) with a class of 'card'
    var card = document.createElement('li');
    card.setAttribute('data-image', cards[i]);
    card.classList.add('card');

    // Insert shuffled image in card
    var cardImage = document.createElement('i');
    cardImage.classList.add('fas', 'fa-' + cards[i]);
    card.appendChild(cardImage);

    // Place card in deck
    cardDeck.appendChild(card);
  }

  enableCardClicks();
}

// compare the selected cards
function compareCards(cards) {

  if (movesMade > 1) {
    document.querySelector('span.moves').innerHTML = movesMade + " Moves";
  } else {
    document.querySelector('span.moves').innerHTML = movesMade + " Move";
  }

  var cardValue1 = cards[0];
  var cardValue2 = cards[1];

  cardValue1 == cardValue2 ? goodMatch(cards) : badMatch(cards);

  selectedCards.length = 0;
}

// reset timer
function resetTimer() {
  stopTimer();
  timeOutput.innerHTML = "00:00";
}

// game won function
function gameWon() {
  stopTimer();

  // display modal after winning
  var time = document.querySelector('.timeOutput').textContent;
  displayModal(movesMade, gameScore, starCount, time);
}

// after every match, check if won game
function checkIfWon() {
  var matchedCardsLength = document.querySelectorAll('.deck li.matched').length;

  matchedCardsLength == 16 ? gameWon() : enableCardClicks();
}

// reset the game
function resetGame() {
  var shadedStars = document.querySelectorAll('.shaded');

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

  // reset stars
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = shadedStars[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var star = _step.value;

      star.classList.remove('shaded');
    }

    // reset moves made
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  movesMade = 0;
  document.querySelector('span.moves').innerHTML = "0 Moves";

  //reset score
  gameScore = 0;
  scoreOutput.innerHTML = gameScore;
}
resetButton.addEventListener('click', resetGame);

/************************ Modal functionality ************************/

function displayModal(totalMovesMade, finalScoreOutput, numStarsOutput, gameTimeOutput) {
  document.querySelector('.total-moves').innerHTML = totalMovesMade;
  document.querySelector('.final-score').innerHTML = finalScoreOutput + ' pts';
  document.querySelector('.num-stars').innerHTML = numStarsOutput;
  document.querySelector('.final-game-time').innerHTML = gameTimeOutput;

  modal.classList.add('show', 'flipInX');
  var modalheader = document.querySelector('.modal-message-header__title');

  modalheader.classList.add('bounceInLeft');

  document.body.addEventListener('click', closeModal);
}

// close modal function, to be attached to 'x'
function closeModal() {
  // modal.classList.add('slideOutUp'); // add feature back in if necessary
  modal.classList.remove('show');
}

document.querySelector('.modal-close-button').addEventListener("click", closeModal);

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

  var cardValue = cards[0];

  var flippedCards = cardDeck.querySelectorAll('.flipped');

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = flippedCards[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var card = _step2.value;

      if (card.getAttribute('data-image') == cardValue) {
        card.classList.remove('flipped');
        card.classList.add('matched');
      }
    }

    // after a good match, check to see if all 16 cards were matched
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

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

  var cardValue1 = cards[0];
  var cardValue2 = cards[1];

  // Turn the card around if the values do not match
  setTimeout(function () {
    var flippedCards = cardDeck.querySelectorAll('.flipped');

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = flippedCards[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var card = _step3.value;

        if (card.getAttribute('data-image') == cardValue1 || card.getAttribute('data-image') == cardValue2) {
          card.classList.remove('open', 'show', 'flipped');
        }
      }

      // enable clicking on cards
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    enableCardClicks();
  }, 800);
}

// shade a star
function shadeStar(next) {
  var stars = document.querySelectorAll('.fa-star.rating');

  stars[next].classList.add('shaded');

  // increase star count
  starCount++;
}

// unshade a star
function unshadeStar() {
  var shadedStars = document.querySelectorAll('.fa-star.rating.shaded');

  shadedStars[starCount - 1].classList.remove('shaded');

  // lower starCount
  starCount--;
}

/********************* Card flipping functionality *********************/

function flipCard(evt) {
  var clickedCard = evt.target;

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
    var cardAttribute = clickedCard.getAttribute('data-image');
    selectedCards.push(cardAttribute);

    // If the selectedCard's array length hits 2, lock clicking functionality and compare the 2 values
    if (selectedCards.length == 2) {
      disableCardClicking();

      movesMade++;

      compareCards(selectedCards);
    }
  }
}

/************** Start of Memory Game **************/
window.onload = layoutCards(shuffledImages);