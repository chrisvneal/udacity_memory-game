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


// // Return the correct target if 'svg' or 'path' node is clicked instead of their 'li' parent
// function findTarget(evt) {
//   let target;
//   let nodeName = evt.target.nodeName.toLowerCase();

//   switch (nodeName) {
//     case "svg":
//       target = evt.target.parentElement;
//       break;
//     case "path":
//       target = evt.target.parentElement.parentElement;
//       break;
//     default:
//       target = evt.target;
//   }
//   return target;
// }






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

// Start of Memory Game ***************
window.onload = layoutCards;




const cardDeck = document.querySelector('.deck');

function goodMatch() {
  // console.log("Good Match!");

  setTimeout(function() {

    // alert('good match');

  }, 800);



}

function badMatch() {
  // console.log("Bad Match!");

  setTimeout(function() {
    // alert('bad match');
  }, 800);




}



// compare the selected cards
function compareCards(cards) {
  let cardValue1 = cards[0];
  let cardValue2 = cards[1];

  cardValue1 == cardValue2 ? goodMatch() : badMatch();
  selectedCards.length = 0;
}




// Initiate selected cards variable
let selectedCards = [];


// Function to flip card when clicked
function flipCard(evt) {
  let card = evt.target;
  
  
  evt.stopPropagation();

  if (card.nodeName.toLowerCase() == 'li') {
    console.log(evt.target.nodeName);

    card.classList.add('open', 'show'); // flip card and show symbol

    let cardAttribute = card.getAttribute('data-image');

    selectedCards.push(cardAttribute);
    // console.log('selectedCards length: ' + selectedCards.length);
    // console.log(selectedCards);

    if (selectedCards.length == 2) {
      // alert("Test the cards");

      // compare the cards
      compareCards(selectedCards);
    }
  }


}

// Add 'click' event to make selected card "flip over"
cardDeck.addEventListener('mousedown', flipCard, true);







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