let cards = [];
let activeBoard = true;
let delayTimeInMs = 500;
let points = 0;
let moves = 0;

function onLoad() {
    let colours = getArrayOfRandomColourPairs(16);
    shuffleArray(colours);
    cards = createCards(colours);
}

function getRandomColourString() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function getArrayOfRandomColourPairs(amount) {
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
    let i = array.length, randomIndex, swap;
    while (--i > 0) {
        randomIndex = Math.floor(Math.random() * (i + 1));
        swap = array[randomIndex];
        array[randomIndex] = array[i];
        array[i] = swap;
    }
    return array;
}

function createCards(colours) {
    let cards = [];
    colours.forEach((c, i) => {
        cards.push({ id: i, colour: c, hidden: true, enabled: true })
    })
    return cards;
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
        revealCard(cards[id]);

        checkCards();
    }
}

async function checkCards() {
    activeBoard = false;
    let selectedCards = getSelectedCards(cards);
    if (selectedCards.length > 1) {
        if (selectedCards[0].colour === selectedCards[1].colour) {
            points++;
            moves++;
            await delay(delayTimeInMs)
            disableCards(selectedCards);
        }
        else {
            points--;
            moves++;
            await delay(delayTimeInMs);
            hideCards(selectedCards);
        }
    }
    updatePointsAndMoves();

    if (isGameFinished(cards)) {
        setUIToGameFinished()
        return;
    }

    activeBoard = true;
}

function getSelectedCards(cards){
    return cards.filter(x => !x.hidden && x.enabled);
}

function disableCards(cards) {
    cards.forEach(x => {
        document.getElementById(x.id).classList.add("disabled");
        x.enabled = false;
    })
}

function hideCards(cards) {
    cards.forEach(x => {
        document.getElementById(x.id).style.backgroundColor = "#eee";
        x.hidden = true;
    })
}

function revealCard(card) {
    document.getElementById(card.id).style.backgroundColor = card.colour;
    card.hidden = false;
}

function updatePointsAndMoves() {
    document.getElementById("points").innerHTML = points;
    document.getElementById("moves").innerHTML = moves;
}

function setUIToGameFinished() {
    document.getElementById("gameFinishedScreen").classList.remove("no-show")
    document.getElementById("score-board").classList.add("no-show")
    document.getElementById("finish-points").innerHTML = points;
    document.getElementById("finish-moves").innerHTML = moves;
}

function isGameFinished(input) {
    return input.every(x => { return !x.enabled; });
}

function reloadPage() {
    window.location.reload();
}