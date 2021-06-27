const chai = window.chai;
const expect = chai.expect;
const match = chai.match;
const assert = chai.assert;

describe('shuffleArray(array)', () => {
    it('should rearrange the array', () => {
        let originalArray = [0,1,2,3,4,5,6,7,8,9];
        let copy = originalArray.slice();
        expect(originalArray).to.eql(copy)
        shuffleArray(copy);
        expect(originalArray).to.have.members(copy)
        expect(originalArray).to.not.eql(copy)
    })
});

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
    it('Should not resolve until after timeout', async () => {
        await delay(delayTimeInMs);
        expect(true).to.be.true;
    }).timeout(allowedTime); //default mocha timeout = 2000
});

