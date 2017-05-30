var celebs;
celebs = ['jennifer aniston', 'kate beckinsale', 'brad pitt', 'robert downey jr',
        'ashley greene', 'chris hemsworth', 'angelina jolie', 'gabriel macht',
        'natalie portman'];

var wins = 0; // number of wins
var loss = 0; // number of losses

var currentGuess = "";

// randomly chooses a celebrity
var compGuess = celebs[Math.floor(Math.random() * celebs.length)];

// writes blanks depending on length of celeb name
for(var i = 0; i < compGuess.length; i++) {
    if (compGuess.charAt(i) === ' ') {
        currentGuess += "\u00A0\u00A0";
    } else if (compGuess.charAt(i) !== ' ') {
        currentGuess += "_";
    }
}

// updates guess element with correct number of spaces depending on celeb name
var currentGuessElement = document.getElementById("guess");
currentGuessElement.textContent = currentGuess;

// for developer: provides computer generated celeb name and current guess length
console.log(compGuess);
console.log(currentGuess);

var correct = false; // initialized value of correct
var incorrectCount = 0; // incorrect count

document.onkeyup = function(event) {
    // determines which key was pressed
    var userGuess = event.key;

    // runs through each character of celeb name to determine if user guess is correct
    for (var j = 0; j < compGuess.length; j++) {
        if (compGuess.charAt(j) === userGuess) {
            // keeps track of correct guesses
            correct = true;

            // calculates the new currentGuess
            currentGuess = currentGuess.substring(0, j) + userGuess + currentGuess.substring(j + 1);
        }
    }

    if (correct == false) {
        incorrectCount++;
    }

    console.log(currentGuess);

    // resets the correct variable back so that it can assess the new key entered
    correct = false;
}