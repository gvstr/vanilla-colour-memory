const chai = window.chai;
const expect = chai.expect;
const match = chai.match;
const assert = chai.assert;

describe('getArrayOfRandomColourPairs(amount)', () => {
    it('should return an array with length same as amount', () => {
        let result = getArrayOfRandomColourPairs(8);
        expect(result.length).to.equal(8)
    })
    it('should always return an even amount of items', () => {
        let result = getArrayOfRandomColourPairs(7);
        expect(result.length).to.equal(8)
    })
});

describe('shuffleArray(array)', () => {
    it('should rearrange the array', () => {
        let originalArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let copy = originalArray.slice();
        expect(originalArray).to.eql(copy)
        shuffleArray(copy);
        expect(originalArray).to.have.members(copy)
        expect(originalArray).to.not.eql(copy)
    })
});

describe('createCards(colours)', () => {
    it('returns an array with the same amount of items as supplied', () => {
        let originalArray = ["#eee","#eee","#eee"];
        let result = createCards(originalArray);
        expect(originalArray.length).to.equal(result.length)
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

describe('isGameFinished(input)', () => {
    it('returns true if no element is enabled', () => {
        let input = [
            {enabled: false},
            {enabled: false},
            {enabled: false},
        ];
        let result = isGameFinished(input);
        expect(result).to.be.true;
    });
    it('returns false if any element is not enabled', () => {
        let input = [
            {enabled: false},
            {enabled: true},
            {enabled: false},
        ];
        let result = isGameFinished(input);
        expect(result).to.be.false;
    });
});

describe('delay(ms)', () => {
    let delayTimeInMs = 2000;
    let allowedTime = delayTimeInMs * 1.05;
    it('Should not resolve until after timeout', async () => {
        await delay(delayTimeInMs);
        expect(true).to.be.true;
    }).timeout(allowedTime); //default mocha timeout = 2000
});