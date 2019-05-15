/*
 * Create a list that holds all of your cards
 */

 
let openCards = [];
let matchedCardsArray = [];  
let moveCounter = 0;
let cardHTML;
let cardsContainer;
let firstClick = true;
let timerFunction;
let seconds1 = 0;
let timerDiv = document.querySelector('.timer')
timerDiv.innerHTML = seconds1 + ' second';

 
// 8 icons, 2 pairs, 16 cards total, these are just strings for 'class name'
let cards = [
    'fa-diamond', 'fa-diamond',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle',
    'fa-bomb', 'fa-bomb'
    ]; 
 
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


function generateCard(card1) {
    // <li class="card fa fa-bolt" data-card="fa-bolt"></li>
    return `<li class="card fa ${card1}" data-card="${card1}"></li>`;
}


function isGameOver() {
    if ( matchedCardsArray.length === 16 ) {
        stopTimer(timerFunction)
        alert(`Game Over`)
    }
}


function countMove() {
    moveCounter++;
    document.querySelector('.moves').innerHTML = moveCounter;
    
    // rate user's moves
    rateMoves();
}


function startTimer() {
    timerFunction = setInterval( function() {
        seconds1++
        timerDiv.innerHTML = seconds1 + ' seconds';
    }, 1000);
}


function stopTimer(input1) {
    clearInterval(input1)
}


function rateMoves() {
    
    switch (moveCounter) {
        case 10:
                document.querySelector('.stars').innerHTML = 
                `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>`    
            break;
            
        case 12:
                 document.querySelector('.stars').innerHTML = 
                `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>`    
            break;
        
        case 14:
                 document.querySelector('.stars').innerHTML = 
                `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>`    
            break;
            
        case 16:
                 document.querySelector('.stars').innerHTML = 
                `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>`    
            break;
            
        case 18:
                 document.querySelector('.stars').innerHTML = 
                `<li><i class="fa fa-star"></i></li>`    
            break;
        
        case 20:
                 document.querySelector('.stars').innerHTML = 
                `<span>You suck!</span>`    
            break;
            
        default:
                document.querySelector('.stars').innerHTML = 
                `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>`    
    }
    
}


// restart game
function addClickEventRestartGame() {
    cardsContainer = document.querySelector('.deck');
    
    let restartButton = document.querySelector('.restart');
    restartButton.addEventListener('click', function() {
        
        cardsContainer.innerHTML = '';  // 'clear the deck'
        makeDeck()                      // make the deck again
        matchedCardsArray = [];         // empty 'matching card' arrays
        moveCounter = 0;
        stopTimer(timerFunction);
        firstClick = true;
        
        // reset to '3 stars'
        document.querySelector('.stars').innerHTML = 
                `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>`    
    })    
}


function addClickEventToCards() {
 
    // select all 'elements' with 'class name' card
    let allCards = document.querySelectorAll('.card');
    
    // add 'event listener' to EACH card with a 'forEach' meth
    allCards.forEach(function(card) {
        
        card.addEventListener('click', function() {
            
            if ( firstClick == true ) {
                startTimer()
                firstClick = false
            }
            
            let previousCard = openCards[0];
            let currentCard = this;
            
            if ( openCards.length === 1 ) { // loop 1
            
                countMove();    // count moves
                card.classList.add('open', 'show', 'disabled'); // adding 'css class'
                openCards.push(this); // 'this' >> card1
                
                if ( previousCard.dataset.card == currentCard.dataset.card ) { // loop 2
                    // console.log(`if: ${this.dataset.card}`)
                
                    // add css matching class
                    previousCard.classList.add('match')        
                    currentCard.classList.add('match')   
                    
                    // add matched cards to the array
                    matchedCardsArray.push(previousCard, currentCard);
                    
                    openCards = []; // go to 'loop 1 else logic'
                    
                    // check if game is over
                    isGameOver();
                    
                } else {
                    
                    openCards = []; // go to 'loop 1 else logic'
                    
                    // delay 'hiding' the cards
                    setTimeout(function() {
                        previousCard.classList.remove('open', 'show', 'disabled')
                        currentCard.classList.remove('open', 'show', 'disabled')    
                    }, 500)
                    
                }
            
            // NO cards are open    
            } else {
                currentCard.classList.add('open', 'show', 'disabled'); // adding 'css class'
                openCards.push(this);
            }
            
        })
      
    });
    
} // addClickEventToCards()


function makeDeck() {
    
    document.querySelector('.moves').innerHTML = 0;
    cards = shuffle(cards);
    
    cardHTML = cards.map(function(asdf) {
        return generateCard(asdf);  // you NEED the return statement with .map()
    });
    
    // 'querySelector the <ul>'
    let ul1 = document.querySelector('.deck');
     
    // The array.join() method is an inbuilt function in JavaScript which is used to join the elements of an array into a string.The elements of the string will be separated by a specified separator and its default value is comma(, ) 
    // adding output to the index.html
    ul1.innerHTML = cardHTML.join(' ');
    
    /**
     * 
     * Game logic starts here
     * 
     **/
        addClickEventToCards();
        addClickEventRestartGame();

} // makeDeck()


/**
 *
 * 
 * Program starts running here
 * 
 * 
**/

makeDeck();











