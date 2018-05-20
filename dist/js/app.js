"use strict";

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

// Array of 8 images for cards
var images = ['robot', 'piggy-bank', 'lightbulb', 'hands-helping', 'crown', 'chess-knight', 'bullhorn', 'bomb', 'robot', 'piggy-bank', 'lightbulb', 'hands-helping', 'crown', 'chess-knight', 'bullhorn', 'bomb'];

// Shuffle images
var shuffledImages = shuffle(images);

// Return the correct target if 'svg' or 'path' node is clicked instead of their 'li' parent
function findTarget(evt) {
  var target = void 0;
  var nodeName = evt.target.nodeName.toLowerCase();

  switch (nodeName) {
    case "svg":
      target = evt.target.parentElement;
      break;
    case "path":
      target = evt.target.parentElement.parentElement;
      break;
    default:
      target = evt.target;
  }
  return target;
}

// Layout 16 cards in the deck
function layoutCards() {

  // Place cards inside "the deck"
  for (var i = 0; i < images.length; i++) {

    // Create a card (li) with a class of 'card'
    var card = document.createElement('li');
    card.setAttribute('data-image', shuffledImages[i]);
    card.classList.add('card');

    // Insert shuffled image in card
    var cardImage = document.createElement('i');
    cardImage.classList.add('fas', 'fa-' + shuffledImages[i]);
    card.appendChild(cardImage);

    // Place card in deck
    cardDeck.appendChild(card);
  }
}

// Start of Memory Game ***************
window.onload = layoutCards;

var cardDeck = document.querySelector('.deck');

// TODO: Create functions for goodMatch() and badMatch()

function compareCards(cards) {
  console.log('Compare ' + cards[0] + ' and ' + cards[1]); //
  var cardvalue1 = cards[0];
  var cardValue2 = cards[1];

  if (cardValue1 == cardValue2) {
    console.log("Good match");
    // goodMatch();
  } else {
    // wrongMatch();
    console.log("Bad match");
  }
}

// Initiate selected cards variable
var selectedCards = [];

// Function to flip card when clicked
function flipCard(evt) {
  var card = findTarget(evt);

  card.classList.add('open', 'show'); // flip card and show symbol

  var cardAttribute = card.getAttribute('data-image');

  selectedCards.push(cardAttribute);
  // console.log('selectedCards length: ' + selectedCards.length);
  // console.log(selectedCards);

  if (selectedCards.length == 2) {
    // alert("Test the cards");

    // compare the cards
    compareCards(selectedCards);
  }

  // console.log(selectedCards);

}

// Add 'click' event to make selected card "flip over"
cardDeck.addEventListener('click', flipCard);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */