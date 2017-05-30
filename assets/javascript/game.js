var celebs;
celebs = ['jennifer aniston', 'kate beckinsale', 'brad pitt', 'robert downey jr',
        'ashley greene', 'chris hemsworth', 'angelina jolie', 'gabriel macht',
        'natalie portman'];

var wins = 0;
var loss = 0;

var currentGuess = "";

// randomly chooses a celebrity
var compGuess = celebs[Math.floor(Math.random() * celebs.length)];

// writes blanks depending on length of celeb name
for(var i = 0; i < compGuess.length; i++) {
    if (compGuess.charAt(i) === ' ') {
        currentGuess += " ";
    } else if (compGuess.charAt(i) !== ' ') {
        currentGuess += "_ ";
    }
}

console.log(compGuess);
console.log(currentGuess);

document.onkeyup = function(event) {
    // determines which key was pressed
    var userGuess = event.key;

    
}