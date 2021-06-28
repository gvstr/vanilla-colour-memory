let cards = [];
let activeBoard = true;
let delayTimeInMs = 500;
let points = 0;
let moves = 0;

function onLoad() {
    let colours = getArrayOfColours(16);
    shuffleArray(colours);
    cards = createArrayOfCards(colours);
}

function getArrayOfColours(amount){
    // will return too many items if uneven amount
    let colours = [];
    while (colours.length < amount) {
        let newColour = getRandomColourString();
        if (colours.indexOf(newColour) === -1) {
            colours.push(newColour);
            colours.push(newColour);
        }
    }
    return colours;
}

function shuffleArray(array) {
    // Fisher-yates shuffle
    let currentIndex = array.length, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
}

function createArrayOfCards(colours){
    let cards = [];
    colours.forEach((c, i) => {
        cards.push({ id: i, colour: c, hidden: true, enabled: true })
    })
    return cards;
}

function getRandomColourString() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function onCardClicked(event) {
    if (activeBoard) {
        let id = event.target.id;
        //onclick event covers entire board, ignore clicks outside of cards
        if (!id) {
            return;
        }
        // clicked same card twice, return
        if (cards[id].hidden = false) {
            return;
        }
        //reveal card
        document.getElementById(id).style.backgroundColor = cards[id].colour;
        cards[id].hidden = false;

        checkCards();
    }
}

async function checkCards() {
    activeBoard = false;
    let selectedCards = cards.filter(x => !x.hidden && x.enabled);
    if (selectedCards.length > 1) {
        if (selectedCards[0].colour === selectedCards[1].colour) {
            points++;
            moves++;
            await delay(delayTimeInMs)
            document.getElementById(selectedCards[0].id).classList.add("disabled");
            document.getElementById(selectedCards[1].id).classList.add("disabled");
            selectedCards[0].enabled = false;
            selectedCards[1].enabled = false;
        }
        else {
            points--;
            moves++;
            await delay(delayTimeInMs);
            document.getElementById(selectedCards[0].id).style.backgroundColor = "#eee";
            document.getElementById(selectedCards[1].id).style.backgroundColor = "#eee";
            selectedCards[0].hidden = true;
            selectedCards[1].hidden = true;
        }
    }
    updatePointsAndMoves();
    isGameFinished(cards) ? SetUIToGameFinished() : activeBoard = true;
}

function updatePointsAndMoves() {
    document.getElementById("points").innerHTML = points;
    document.getElementById("moves").innerHTML = moves;
}

function SetUIToGameFinished() {
        document.getElementById("gameFinishedScreen").classList.remove("no-show")
        document.getElementById("score-board").classList.add("no-show")
        document.getElementById("finish-points").innerHTML = points;
        document.getElementById("finish-moves").innerHTML = moves;
}

function isGameFinished(input){
    return input.every(x => { return !x.enabled; });
}

function reloadPage() {
    window.location.reload();
}