/*
 * Create a list that holds all of your cards
 */
 

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




function initGame() {


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


// invoke the function initGame()
initGame();

// select all 'elements' with 'class name' card
let allCards = document.querySelectorAll('.card');
let openCards = [];

// add 'event listener' to EACH card with a 'forEach' meth
allCards.forEach(function(card) {
    
    card.addEventListener('click', function() {
        
        if ( !card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match') ) {
            
            // add card into array, add 'open, show css class' to the card
            openCards.push(card);
            card.classList.add('open', 'show');
        
        
            if ( openCards.length == 2 ) {
                
                // check if 2 cards are the same type
                // let firstCard = openCards[0].querySelector('i').classList.item(1); // get the first item in the array, get the 2nd name inside the 'class attribute'
                //  <li class="card" data-card="fa-diamond">
                if ( openCards[0].dataset.card == openCards[1].dataset.card ) {
                
                    openCards[0].classList.add('match', 'open', 'show')
                    openCards[1].classList.add('match', 'open', 'show')
                    
                    openCards = []; // empty the array
                    
                } else {
                    // card does not match
                    // after * second remove 'open' 'show' css class
                    setTimeout( function() {
                        openCards.forEach(function(asdf) {
                            asdf.classList.remove('open', 'show');   // 'hide' the 2 cards
                    });
                
                        openCards = []; // empty the array
                    }, 2000);    
                }
                
            } 
        
        }
        
        
        // console.log(openCards);
        
    }); // addEventListener
    
});
