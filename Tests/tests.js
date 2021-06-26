const chai = window.chai;
const expect = chai.expect;
const match = chai.match;
const assert = chai.assert;

describe('getRandomColourString()', () => {
    it('Should return a string', () => {
        assert.typeOf(getRandomColourString(), 'string')
    });
    // currently it can return a non valid hex string (string thats not 3 or 6 characters)
    it('String should be a valid hex color', () => {
        expect(getRandomColourString()).to.match(/^#[0-9A-F]{3,6}$/i)
    })
});

describe('delay(ms)', () => {
    let delayTimeInMs = 2000;
    let allowedTime = delayTimeInMs * 1.05;
    it('Should not resolve until timeout', async () => {
        await delay(delayTimeInMs);
        expect(true).to.be.true;
    }).timeout(allowedTime); //default mocha timeout = 2000
});

describe('shuffleArray(array)', () => {
    let delayTimeInMs = 2000;
    let allowedTime = delayTimeInMs * 1.05;
    it('Should not resolve until timeout', async () => {
        await delay(delayTimeInMs);
        expect(true).to.be.true;
    }).timeout(allowedTime); //default mocha timeout = 2000
});