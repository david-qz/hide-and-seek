// import needed modules
import { getRandomItem, score } from './utils.js';

// state
const spots = ['tree', 'boulder', 'shed'];
let total = 0;
let wins = 0;
let spot = '';
let guessed = '';
let timeout = 0;

function handleGuess(guess) {
    // Generate a random correct spot and score user's guess
    spot = getRandomItem(spots);
    const result = score(guess, spot);

    // Increment stats
    if (result) wins++;
    total++;

    // Store the guess so we can apply special background
    guessed = guess;
    // Clear the timeout, in case user is clicking again before
    // 2 seconds
    clearTimeout(timeout);

    // update the view
    displayResults();
    displayHidingSpots();
}

// Hiding Spots Component
const shedButton = document.getElementById('shed-button');
const treeButton = document.getElementById('tree-button');
const boulderButton = document.getElementById('boulder-button');

function resetClasses() {
    // reset face and guess classes
    treeButton.classList.remove('face', 'guessed');
    shedButton.classList.remove('face', 'guessed');
    boulderButton.classList.remove('face', 'guessed');
}

const spotToElementMap = new Map();
spotToElementMap.set('tree', treeButton);
spotToElementMap.set('shed', shedButton);
spotToElementMap.set('boulder', boulderButton);

function displayHidingSpots() {
    // clear existing classes
    resetClasses();

    // add face class
    spotToElementMap.get(spot).classList.add('face');
    spotToElementMap.get(guessed).classList.add('guessed');

    // Clear the face and guessed classes after two seconds
    // store the timeout so we can clear if user makes
    // another guess before 2 seconds
    timeout = setTimeout(resetClasses, 2000);
}

treeButton.addEventListener('click', () => {
    handleGuess('tree');
});

boulderButton.addEventListener('click', () => {
    handleGuess('boulder');
});

shedButton.addEventListener('click', () => {
    handleGuess('shed');
});


// Results Component
const winsDisplay = document.getElementById('wins-display');
const lossesDisplay = document.getElementById('losses-display');
const totalDisplay = document.getElementById('total-display');

function displayResults() {
    winsDisplay.textContent = wins;
    lossesDisplay.textContent = total - wins;
    totalDisplay.textContent = total;
}


// page load actions
displayHidingSpots();
displayResults();
