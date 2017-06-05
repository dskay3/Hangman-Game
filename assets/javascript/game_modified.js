// Variables
var loss = 0;
var wins = 0;
var initialTries = 7;
var guessedLetters = "";

// Celeb name array
var celebs;
celebs = ['jennifer aniston', 'kate beckinsale', 'brad pitt', 'robert downey jr', 'ashley greene', 
        'chris hemsworth', 'angelina jolie', 'gabriel macht', 'natalie portman'];

// Elements
var currentGuessElement = document.getElementById("guess");
var numOfTriesElement = document.getElementById("numOfTries"); // gets the HTML element for numOfTries
var numLossElement = document.getElementById("numLoss"); // gets the HTML element for numLoss
var numWinsElement = document.getElementById("numWins"); // gets the HTML element for numWins
var guessedLettersElement = document.getElementById("guessed-letters"); // gets the HTML element for guessed-letters

// Functions
function hangman() {
    // Variables
    var currentGuess = ""; // initialized current guess variable
    var correct = false; // initialized value of correct
    var incorrectCount = 0; // incorrect count
    var wonGame = true; // initialized win boolean
    var compGuess = celebs[Math.floor(Math.random() * celebs.length)]; // randomly chooses a celebrity

    // writes blanks depending on length of celeb name
    for(var i = 0; i < compGuess.length; i++) {
        if (compGuess.charAt(i) === ' ') {
            currentGuess += "\u00A0";
        } else if (compGuess.charAt(i) !== ' ') {
            currentGuess += "_";
        }
    }

    // updates guess element with correct number of spaces depending on celeb name
    currentGuessElement.textContent = currentGuess;

    // for developer: writes computer generated celeb name in console and initial blanks
    console.log("Computer Generated Answer: " + compGuess);
    console.log("Initial number of blanks: " + currentGuess);

    // executes when a key is pressed
    keyPressed = document.onkeyup = function(event) {
        var userGuess = event.key; // determines which key was pressed

        // calculates the letters guessed (guessedLetters may need to be removed and the add operation may need to be added somewhere else)
        guessedLetters = guessedLetters + userGuess + " ";

        guessedLettersElement.textContent = guessedLetters; // prints the guessed letters

        // runs through each character of celeb name to determine if user guess is correct
        for (var j = 0; j < compGuess.length; j++) {
            if (compGuess.charAt(j) === userGuess) {
                correct = true; // keeps track of correct guesses

                // calculates the new currentGuess
                currentGuess = currentGuess.substring(0, j) + userGuess 
                        + currentGuess.substring(j + 1);
            }
        }

        // runs when key stroke is incorrect
        if (correct == false) {
            incorrectCount++; // increases incorrect count by 1

            var remainingTries = initialTries - incorrectCount; // performs calculation for remaining number of tries

            numOfTriesElement.textContent = remainingTries; // updates HTML element with result of remaining number of tries
        }

        // for developer: writes currentGuess outcome to console.
        console.log("Current guess: " + currentGuess);

        currentGuessElement.textContent = currentGuess; // prints the current guess

        correct = false; // resets the correct variable back so that it can assess the new key entered

        // generates a new word if incorrect count is greater than 7
        if (remainingTries === 0) {
            guessedLetters = ""; // resets the guessed letters

            guessedLettersElement.textContent = guessedLetters; // prints the guessed letters reset

            hangman(); // executes the hangman function
            
            numOfTriesElement.textContent = initialTries; // resets the numOfTries HTML element

            loss++; // increases loss by 1

            numLossElement.textContent = loss; // prints the number of losses
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
           
            numWinsElement.textContent = wins; // prints the number of wins
            
            guessedLetters = ""; // resets the guessed letters
            
            guessedLettersElement.textContent = guessedLetters; // prints the guessed letters reset

            hangman(); // executes the hangman function
        }

        wonGame = true; // resets wonGame variable
    }
}

// Main process



function hangmanGame(keyPressed) {
    var letters = /^[A-Za-z]+$/;
    if (keyPressed == letters) {
        hangman();
    }
};

var keykey = document.onkeyup;

hangmanGame(keykey);