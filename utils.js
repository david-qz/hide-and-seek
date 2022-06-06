
export function getRandomItem(array) {
    const random = Math.floor(Math.random() * array.length);
    const item = array[random];
    return item;
}

export function score(guess, spot) {
    return guess === spot ? 1 : 0;
}
