"use strict";

var cardDeck = document.querySelector('.deck');

// Array of 8 images for cards
var images = ['robot', 'piggy-bank', 'lightbulb', 'hands-helping', 'crown', 'chess-knight', 'bullhorn', 'bomb', 'robot', 'piggy-bank', 'lightbulb', 'hands-helping', 'crown', 'chess-knight', 'bullhorn', 'bomb'];

// Shuffle images
var shuffledImages = shuffle(images);

// Initiate variable for selected cards
var selectedCards = [];

// Establish initial moves made message
var movesMade = 0;
document.querySelector('span.moves').innerHTML = movesMade + " Moves";

/**************************** Functions ****************************/

// Shuffle function from http://stackoverflow.com/a/2450976
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

  movesMade++;

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

// for (let card of shadedStars) {
//   console.log(card.classList);
//     }

// console.log(shadedStars);

// reset the game
function resetGame() {
  // console.log('the game has been reset');
  var shadedStars = document.querySelectorAll('.shaded');

  // reset board
  cardDeck.innerHTML = "";

  // shuffle cards
  shuffledImages = shuffle(shuffledImages);

  // reset cards clicked
  cardsClicked = 0;

  // layout cards
  layoutCards(shuffledImages);

  // reset timer
  stopTimer();
  timeOutput.innerHTML = "00:00";

  // reset stars
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = shadedStars[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var card = _step.value;

      card.classList.remove('shaded');
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

var resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', resetGame);

// change score
function changeScore() {}

function gameWon() {
  stopTimer();
  cardsClicked = 0;
  alert('You won!');

  // TODO: Create a modal for winner
}

// check if won game
function checkIfWon() {
  var matchedCardsLength = document.querySelectorAll('.deck li.matched').length;

  if (matchedCardsLength == 16) {
    gameWon();
  } else {
    enableCardClicks();
  }
}

var scoreOutput = document.querySelector('.scoreOutput');
var gameScore = 0;

var unshadedStars = document.querySelectorAll('.fa-star:not(.shaded)');
// console.log('Unshaded stars: ' + unshadedStars.length);

// console.log(unshadedStars[0]);


// TODO: program number of stars to shade
function shadeStar() {
  // for (let star of unshadedStars) {
  //   star.classList.add('shaded');
  // }

  // for (let i = 0; i < numberToShade; i++) {

  // }

  unshadedStars[0].classList.add('shaded');

  // grab list of unshaded stars


  //if there is less stars shaded than supposed to provide, provide up to the rest

}

// Invoke when match is good
function goodMatch(cards) {
  // Gain 10 points for a good match
  gameScore += 10;
  // console.log(gameScore);


  if (movesMade == 1) {
    shadeStar();
    gameScore += 10;
    // console.log('with an extra 10 points: ' + gameScore);
  }

  scoreOutput.innerHTML = gameScore;

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

    //enable clicking on cards again
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

  setTimeout(function () {
    checkIfWon();
  }, 100);
}

// Invoke when match is bad
function badMatch(cards) {

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

var cardsClicked = 0;
// Function to flip card when clicked
function flipCard(evt) {
  var clickedCard = evt.target;

  cardsClicked++;

  if (cardsClicked == 1) {
    startTimer();
  }

  if (clickedCard.nodeName.toLowerCase() == 'li') {

    // Flip card and show symbol
    clickedCard.classList.add('open', 'show', 'flipped');

    // Put the card's value in the selected card's array
    var cardAttribute = clickedCard.getAttribute('data-image');
    selectedCards.push(cardAttribute);

    // If the selectedCard 's array length hits 2, lock clicking functionality and compare the 2 values
    if (selectedCards.length == 2) {
      disableCardClicking();

      compareCards(selectedCards);
    }
  }
}

// Timer *********************
var seconds = 0;
var minutes = 0;
var timeOutput = document.querySelector(".timeOutput");

// insert time in timer output
function insertTime() {
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

var gameTimer = void 0;

// startTimer()
function startTimer() {
  gameTimer = setInterval(insertTime, 1000);
}

// stopTimer()
function stopTimer() {
  clearInterval(gameTimer);
  seconds = 0;
  minutes = 0;
}

// Start of Memory Game ***************
window.onload = layoutCards(shuffledImages);

/*
 * set up the event listener for a card. If a card is clicked:
 * 
 * Done
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 * 
 * 
 * 
 * 
 *  
 * 
 * Done   
 * + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 * 
 * Done
 * + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 * 
 * Done
 * + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 * 
 * 
 * 
 * 
 * 
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */