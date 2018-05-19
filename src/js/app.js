/*
 * Create a list that holds all of your cards
 */

const cardDeck = document.querySelector('.deck');
const numberOfCards = 16;

let imageName = [ 'robot', 'piggy-bank', 'lightbulb', 'hands-helping', 'crown', 'chess-knight', 'bullhorn', 'bomb'];




// Place cards inside "the deck"
for (let i = 0; i < numberOfCards; i++) {

  // Create a card (li) with a class of 'card'
  let card = document.createElement('li');
  card.classList.add('card', 'show');

  // Insert image on card



    // choose a random image, no mnore than twice and put on card



  let cardImage = document.createElement('i');
  cardImage.classList.add('fas', 'fa-' + imageName[0]);
  card.appendChild(cardImage);

  // Place card in deck
  cardDeck.appendChild(card);
}


















/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */










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