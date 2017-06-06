// initial values
var loss = 0; // number of losses
var wins = 0; // number of wins
var initialTries = 7; // number of tries
var congrats = new Audio(["assets/audio/cheer.mp3"]); // audio file
var celebs = ['jennifer aniston', 'kate beckinsale', 'brad pitt',
            'robert downey jr', 'ashley greene', 'chris hemsworth', 
            'angelina jolie', 'gabriel macht', 'natalie portman'];
var currentGuess; // initialized current guess
var currentGuessElement;
var compGuess; // initialized computer guess
var correct = false; // initialized value of correct
var incorrectCount = 0; // incorrect count
var wonGame = true; // initialized win boolean
var guessedLetters; // initialized guessed letters

var numOfTriesElement = document.getElementById("numOfTries");
var numLossElement = document.getElementById("numLoss");
var numWinsElement = document.getElementById("numWins");
var guessedLettersElement = document.getElementById("guessed-letters");


// new game
function newGame() {
    generateWord();
    blanks();
    troubleshoot();
    hangman();
}

// generate new word
function generateWord() {
    compGuess = celebs[Math.floor(Math.random() * celebs.length)];
}

// create blanks depending on the length of celeb name
function blanks() {
    currentGuess = ""; // empties current guess
    
    for(var i = 0; i < compGuess.length; i++) {
        if (compGuess.charAt(i) === ' ') {
            currentGuess += "\u00A0";
        } else if (compGuess.charAt(i) !== ' ') {
            currentGuess += "_";
        }
    }

    // updates guess element with correct number of spaces depending on celeb name
    currentGuessElement = document.getElementById("guess");
    currentGuessElement.textContent = currentGuess;
}

// developer tools
function troubleshoot() {
    // writes computer generated celeb name in console and initial blanks
    console.log("Computer Generated Answer: " + compGuess);
    console.log("Initial number of blanks: " + currentGuess);
}

// resets variables
function resetLetters() {
    guessedLetters = "";
    incorrectCount = 0;
    remainingTries = 7;
    guessedLettersElement.textContent = guessedLetters;
}


// plays the hangman game
function hangman() {
    guessedLetters = ""; // initialized the guessed letters

    // executes when a key is pressed
    document.onkeyup = function(event) {
        var userGuess = event.key.toLowerCase(); // registers the lowercase version of key pressed

        // resets image
        document.getElementById("celeb-img").src = "assets/images/hollywood.jpg";

        // executes only when a letter is selected
        if (/^[a-zA-Z]$/.test(userGuess) && !guessedLetters.includes(userGuess)){
            // calculates the letters guessed
            guessedLetters = guessedLetters + userGuess + " ";

            guessedLettersElement.textContent = guessedLetters; // prints the guessed letters

            // runs through each character of celeb name to determine if user guess is correct
            for (var j = 0; j < compGuess.length; j++) {
                if (compGuess.charAt(j) === userGuess) {
                    correct = true; // keeps track of correct guesses

                    // calculates the new currentGuess
                    currentGuess = currentGuess.substring(0, j) + userGuess + currentGuess.substring(j + 1);
                }
            }

            // runs when key stroke is incorrect
            if (correct == false) {
                incorrectCount++; // increases incorrect count by 1

                // performs calculation for remaining number of tries
                var remainingTries = initialTries - incorrectCount;

                // updates HTML element with result of remaining number of tries
                numOfTriesElement.textContent = remainingTries;
            }

            // for developer: writes currentGuess outcome to console.
            console.log("Current guess: " + currentGuess);

            currentGuessElement.textContent = currentGuess; // prints the current guess

            // resets the correct variable back so that it can assess the new key entered
            correct = false;

            // generates a new word if incorrect count is greater than 7
            if (remainingTries === 0) {
                resetLetters();
                newGame();
                
                numOfTriesElement.textContent = remainingTries;

                loss++; // increases loss by 1
                numLossElement.textContent = loss; // prints the number of losses

                // alerts loss and displays correct word.
                alert("You lose. The Celerity was " + compGuess + ". Press okay to play again.");
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

                gameWon();  
                resetLetters();

                // resets the numOfTries HTML element
                numOfTriesElement.textContent = initialTries;

                newGame();
            }

            // resets wonGame variable
            wonGame = true;
        }
    }
}

// displays celebrity and plays audio file
function gameWon() {
    winAniston();
    winBeckinsale();
    winDowney();
    winGreene();
    winHemsworth();
    winJolie();
    winMacht();
    winPitt();
    winPortman();
    congrats.play();
    numWinsElement.textContent = wins; // prints the number of wins
    currentGuessElement.textContent = currentGuess; // prints the current guess
}

// executes the hangman function
newGame();