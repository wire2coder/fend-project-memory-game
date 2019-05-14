// select all 'elements' with "class" card
let allCards = document.querySelectorAll('.card')
let openCards = []; // empty array

console.log('program starts')

// add 'event listener' to all of them elements
allCards.forEach( function(card) {
    card.addEventListener('click', function(event) {
        console.log(openCards.length);
        
        openCards.push(card)    // push 'card' into array, then open the card
        card.classList.add('open', 'show')  // 'open' will just show the color, 'show' will show the picture
      
        if (openCards.length == 2) {
            
            setTimeout(function() {
                openCards.forEach( function(card) {
                    card.classList.remove('open', 'show'); // 'hide' the 2 cards
                    openCards = []; // empty the array
                })
            
            }, 1000)
            
        }
        
    })
}) // allCards.forEach

// TODO 5/6 
// https://youtu.be/x47oLiTpIVk?t=1501
// TODO 5/7
// https://youtu.be/x47oLiTpIVk?t=2747
// make a logic to check if 2 cards MATCHED

// TODO 5/8
// https://youtu.be/x47oLiTpIVk?t=3091
// increment the counter

// TODO 5/12, 'starting over'
// https://youtu.be/G8J13lmApkQ?t=911

// TODO 5/13
https://youtu.be/G8J13lmApkQ?t=1935