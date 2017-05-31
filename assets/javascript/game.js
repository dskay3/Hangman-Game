// initial values
var loss = 0; // number of losses
var wins = 0; // number of wins
var initialTries = 7; // number of tries


/* 
    function to play the hangman game
*/
function hangman() {
    var celebs;
    celebs = ['jennifer aniston', 'kate beckinsale', 'brad pitt', 'robert downey jr',
            'ashley greene', 'chris hemsworth', 'angelina jolie', 'gabriel macht',
            'natalie portman'];

    var currentGuess = "";

    // randomly chooses a celebrity
    var compGuess = celebs[Math.floor(Math.random() * celebs.length)];

    // writes blanks depending on length of celeb name
    for(var i = 0; i < compGuess.length; i++) {
        if (compGuess.charAt(i) === ' ') {
            currentGuess += "\u00A0";
        } else if (compGuess.charAt(i) !== ' ') {
            currentGuess += "_";
        }
    }

    // updates guess element with correct number of spaces depending on celeb name
    var currentGuessElement = document.getElementById("guess");
    currentGuessElement.textContent = currentGuess;

    // for developer: writes computer generated celeb name in console and initial blanks
    console.log("Computer Generated: " + compGuess);
    console.log("Initial number of blanks: " + currentGuess);

    var correct = false; // initialized value of correct
    var incorrectCount = 0; // incorrect count

    // gets the HTML element for numOfTries
    var numOfTriesElement = document.getElementById("numOfTries");

    // gets the HTML element for numLoss
    var numLossElement = document.getElementById("numLoss");

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

        // runs when key stroke is incorrect
        if (correct == false) {
            // increases incorrect count by 1
            incorrectCount++;

            // performs calculation for remaining number of tries
            var remainingTries = initialTries - incorrectCount;

            /* updates HTML element with result of remaining number 
            of tries */
            numOfTriesElement.textContent = remainingTries;
        }

        // for developer: writes currentGuess outcome to console.
        console.log("Current guess: " + currentGuess);

        // resets the correct variable back so that it can assess the new key entered
        correct = false;

        // generates a new word if incorrect count is greater than 7
        if (remainingTries === 0) {
            // executes the hangman function
            hangman();
            
            // resets the numOfTries HTML element
            numOfTriesElement.textContent = initialTries;

            // increases loss by 1
            loss++;

            // prints the number of losses
            numLossElement.textContent = loss;
        }
    }
}

// executes the hangman function
hangman();