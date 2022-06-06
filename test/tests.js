import { score } from '../utils.js';

const test = QUnit.test;

test('scores winning guesses as 1', (expect) => {
    expect.equal(score('tree', 'tree'), 1);
    expect.equal(score('boulder', 'boulder'), 1);
    expect.equal(score('shed', 'shed'), 1);
});

test('scores losing guesses as 0', (expect) => {
    expect.equal(score('tree', 'shed'), 0);
    expect.equal(score('tree', 'boulder'), 0);
    expect.equal(score('shed', 'tree'), 0);
    expect.equal(score('shed', 'boulder'), 0);
    expect.equal(score('boulder', 'tree'), 0);
    expect.equal(score('boulder', 'shed'), 0);
});