// initial values
var loss = 0; // number of losses
var wins = 0; // number of wins
var initialTries = 7; // number of tries


/* 
    function to play the hangman game
*/
function hangman() {
    // array that houses celeb names
    var celebs;
    celebs = ['jennifer aniston', 'kate beckinsale', 'brad pitt',
            'robert downey jr', 'ashley greene', 'chris hemsworth', 
            'angelina jolie', 'gabriel macht', 'natalie portman'];

    var currentGuess = ""; // initialized current guess variable

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
    console.log("Computer Generated Answer: " + compGuess);
    console.log("Initial number of blanks: " + currentGuess);

    var correct = false; // initialized value of correct
    var incorrectCount = 0; // incorrect count
    var wonGame = true; // initialized win boolean

    // gets the HTML element for numOfTries
    var numOfTriesElement = document.getElementById("numOfTries");

    // gets the HTML element for numLoss
    var numLossElement = document.getElementById("numLoss");

    // gets the HTML element for numWins
    var numWinsElement = document.getElementById("numWins");

    // executes when a key is pressed
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
            hangman(); // executes the hangman function
            
            // resets the numOfTries HTML element
            numOfTriesElement.textContent = initialTries;

            loss++; // increases loss by 1

            // prints the number of losses
            numLossElement.textContent = loss;
        }

        // calculates if game is won
        for(var k = 0; k < currentGuess.length; k++) {
            if (currentGuess.charAt(k) === '_') {
                wonGame = false;
            }
        }

        // executes when game is won
        if (wonGame === true) {
            wins++; // increases wins by 1

            // prints the number of wins
            numWinsElement.textContent = wins;

            hangman(); // executes the hangman function
        }

        // resets wonGame variable
        wonGame = true;
    }
}

// executes the hangman function
hangman();