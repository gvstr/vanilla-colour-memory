let cards = [];
let activeBoard = true;
let delayTimeInMs = 500;
let points = 0;
let moves = 0;

function onLoad() {
    let colours = [];
    while (colours.length < 16) {
        let newColour = getRandomColourString();
        if (colours.indexOf(newColour) === -1) {
            colours.push(newColour);
            colours.push(newColour);
        }
    }
    shuffleArray(colours);
    colours.forEach((c, i) => {
        cards.push({ cardId: i, colour: c, hidden: true, enabled: true })
    })
}

function shuffleArray(array) {
    // Fisher-yates shuffle
    let currentIndex = array.length,
        randomIndex;
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

function getRandomColourString() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function onCardClicked(event) {
    if (activeBoard) {
        let cardId = event.target.id;
        //onclick event covers entire board, ignore clicks outside of cards
        if (!cardId) {
            return;
        }
        // clicked same card twice, return
        if (cards[cardId].hidden = false) {
            return;
        }
        //reveal card
        document.getElementById(cardId).style.backgroundColor = cards[cardId].colour;
        cards[cardId].hidden = false;

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
            document.getElementById(selectedCards[0].cardId).classList.add("disabled");
            document.getElementById(selectedCards[1].cardId).classList.add("disabled");
            selectedCards[0].enabled = false;
            selectedCards[1].enabled = false;
        }
        else {
            points--;
            moves++;
            await delay(delayTimeInMs);
            selectedCards[0].hidden = true;
            document.getElementById(selectedCards[0].cardId).style.backgroundColor = "#eee";
            selectedCards[1].hidden = true;
            document.getElementById(selectedCards[1].cardId).style.backgroundColor = "#eee";
        }
    }
    updatePointsAndMoves();
    checkIfGameIsFinished();
}

function updatePointsAndMoves() {
    document.getElementById("points").innerHTML = points;
    document.getElementById("moves").innerHTML = moves;
}

function checkIfGameIsFinished() {
    let gameIsFinished = cards.every(x => { return !x.enabled; });
    if (gameIsFinished) {
        document.getElementById("gameFinishedScreen").classList.remove("no-show")
        document.getElementById("score-board").classList.add("no-show")
        document.getElementById("finish-points").innerHTML = points;
        document.getElementById("finish-moves").innerHTML = moves;
    }
    else {
        activeBoard = true;
    }
}

function reloadPage() {
    window.location.reload();
}