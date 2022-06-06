// import needed modules
import { getRandomItem, score } from './utils.js';

const spots = ['tree', 'boulder', 'shed'];

// state
let stateInstance = {
    total: 0,
    wins: 0,
    get losses() {
        return this.total - this.wins;
    },
    spot: '',
    guessed: '',
    timeout: 0,
};

function handleGuess(guess, state) {
    // Generate a random correct spot and score user's guess
    state.spot = getRandomItem(spots);
    const result = score(guess, state.spot);

    // Increment stats
    if (result) state.wins++;
    state.total++;

    // Store the guess so we can apply special background
    state.guessed = guess;
    // Clear the timeout, in case user is clicking again before
    // 2 seconds
    clearTimeout(state.timeout);

    // update the view
    displayResults(state);
    displayHidingSpots(state);
}

// Hiding Spots Component
const spotElements = new Map();
spotElements.set('tree', document.getElementById('shed-button'));
spotElements.set('shed', document.getElementById('tree-button'));
spotElements.set('boulder', document.getElementById('boulder-button'));

function resetClasses() {
    // reset face and guess classes
    spotElements.forEach(element => {
        element.classList.remove('face', 'guessed');
    });
}

function displayHidingSpots(state) {
    // clear existing classes
    resetClasses();

    // add face and guessed classes where appropriate
    spotElements.get(state.spot)?.classList.add('face');
    spotElements.get(state.guessed)?.classList.add('guessed');

    // Clear the face and guessed classes after two seconds
    // store the timeout so we can clear if user makes
    // another guess before 2 seconds
    state.timeout = setTimeout(resetClasses, 2000);
}

for (const [k, v] of spotElements) {
    v.addEventListener('click', () => {
        handleGuess(k, stateInstance);
    });
}

// Results Component
const winsDisplay = document.getElementById('wins-display');
const lossesDisplay = document.getElementById('losses-display');
const totalDisplay = document.getElementById('total-display');

function displayResults(state) {
    winsDisplay.textContent = state.wins;
    lossesDisplay.textContent = state.losses;
    totalDisplay.textContent = state.total;
}

// page load actions
displayHidingSpots(stateInstance);
displayResults(stateInstance);
