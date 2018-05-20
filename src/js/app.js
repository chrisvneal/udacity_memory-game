"use strict";

// Shuffle function from http://stackoverflow.com/a/2450976
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

// Array of 8 images for cards
let images = ['robot', 'piggy-bank', 'lightbulb', 'hands-helping', 'crown', 'chess-knight', 'bullhorn', 'bomb', 'robot', 'piggy-bank', 'lightbulb', 'hands-helping', 'crown', 'chess-knight', 'bullhorn', 'bomb'];

// Shuffle images
let shuffledImages = shuffle(images);



// Initiate variable for selected cards
let selectedCards = [];

const cardDeck = document.querySelector('.deck');






// Layout 16 cards in the deck
function layoutCards() {

  // Place cards inside "the deck"
  for (let i = 0; i < images.length; i++) {

    // Create a card (li) with a class of 'card'
    const card = document.createElement('li');
    card.setAttribute('data-image', shuffledImages[i]);
    card.classList.add('card');

    // Insert shuffled image in card
    let cardImage = document.createElement('i');
    cardImage.classList.add('fas', 'fa-' + shuffledImages[i]);
    card.appendChild(cardImage);



    // Place card in deck
    cardDeck.appendChild(card);
  }
}



// compare the selected cards
function compareCards(cards) {
  let cardValue1 = cards[0];
  let cardValue2 = cards[1];

  cardValue1 == cardValue2 ? goodMatch(cards) : badMatch(cards);

  selectedCards.length = 0;
}

function lockCards() {
  cardDeck.removeEventListener('mousedown', flipCard);
}
 






// Invoke when match is good
function goodMatch(cards) {
  // console.log("Good Match!");

  let cardValue = cards[0];
  // console.log(cardValue);
  let flippedCards = cardDeck.querySelectorAll('.flipped');

  for (let card of flippedCards) {
    if (card.getAttribute('data-image') == cardValue) {
      card.classList.remove('flipped');
      card.classList.add('matched');
    }
  }

  

  setTimeout(function() {

    // alert('good match');
    

  }, 800);
}

// Invoke when match is bad
function badMatch(cards) {

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
  }, 800);

  // Givev click functionality back after disabling
  // cardDeck.addEventListener('mousedown', flipCard);
}

// Function to flip card when clicked
function flipCard(evt) {
  let clickedCard = evt.target;

  if (clickedCard.nodeName.toLowerCase() == 'li') {

    // Flip card and show symbol
    clickedCard.classList.add('open', 'show', 'flipped');

    // Put the card's value in the selected card's array
    let cardAttribute = clickedCard.getAttribute('data-image');
    selectedCards.push(cardAttribute);

    // If the selectedCard 's array length hits 2, lock clicking functionality and compare the 2 values
    if (selectedCards.length == 2) {
      // lockCards();            

      compareCards(selectedCards);      
    }
  }
}

// Start of Memory Game ***************
window.onload = layoutCards;






// Add 'click' event to make selected card "flip over"
cardDeck.addEventListener('mousedown', flipCard);








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