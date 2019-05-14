/*
 * Create a list that holds all of your cards
 */
 
 
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



// 8 icons, 2 pairs, 16 cards total, these are just strings for 'class name'
 var cards = [
    'fa-diamond', 'fa-diamond',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle',
    'fa-bomb', 'fa-bomb'
    ];


function generateCard(card1) {
    // <li class="card fa fa-bolt" data-card="fa-bolt"></li>
    return `<li class="card fa ${card1}" data-card="${card1}"></li>`;
}


function makeDeck() {

    cards = shuffle(cards);
    
    let cardHTML = cards.map(function(asdf) {
        return generateCard(asdf);  // you NEED the return statement with .map()
    });
    
    // 'querySelector the <ul>'
    let ul1 = document.querySelector('.deck');
     
    // The array.join() method is an inbuilt function in JavaScript which is used to join the elements of an array into a string.The elements of the string will be separated by a specified separator and its default value is comma(, ) 
    // adding output to the index.html
    ul1.innerHTML = cardHTML.join(' ')
    
}


let openCards = [];
makeDeck();

// select all 'elements' with 'class name' card
let allCards = document.querySelectorAll('.card');

// add 'event listener' to EACH card with a 'forEach' meth
allCards.forEach(function(card) {
    
    card.addEventListener('click', function() {
        
        let currentCard = this;
        let previousCard = openCards[0];
        
        
        if ( openCards.length === 1 ) { // loop 1
            card.classList.add('open', 'show'); // adding 'css class'
            openCards.push(this); // 'this' >> card1
            
            if ( previousCard.dataset.card == currentCard.dataset.card ) { // loop 2
                // console.log(`if: ${this.dataset.card}`)
            
                // add css matching class
                previousCard.classList.add('match')        
                currentCard.classList.add('match')        
                
                openCards = []; // exit out of loop 1
            } else {
                previousCard.classList.remove('open', 'show')
                currentCard.classList.remove('open', 'show')
                
                openCards = []; // exit out of loop 1
            }
            
        } else {
            currentCard.classList.add('open', 'show'); // adding 'css class'
            openCards.push(this);
        }
        
        
        
    })
  
    
});
