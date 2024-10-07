// Make sure data.js is loaded before running this script

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
const partyEvents = [
    "Cake cutting",
    "Opening presents",
    "Singing 'Happy Birthday'",
    "Party games (like musical chairs)",
    "Dancing",
    "Piñata",
    "Blowing out candles",
    "Face painting",
    "Balloon animals",
    "Photo booth",
    "Bouncy castle",
    "Treasure hunt",
    "Eating snacks",
    "Playing with party favors",
    "Costume contest",
    "Craft station (making bracelets, etc.)",
    "Tug of war",
    "Parents taking photos",
    "Storytelling or puppet show",
    "Outdoor play",
    "Gift bags for guests",
    "Ice cream time",
    "Decorating cupcakes",
    "Group photo",
    "Bubble blowing"
];

function getRandomPartyEvents(count = 3) {
    const shuffledEvents = shuffle([...partyEvents]);
    return shuffledEvents.slice(0, count); // Returns 3 random party events
}

// When generating the card, you can add the random events like this:
function generateCard() {
    const card = document.getElementById('bingo-card');
    const titleElement = document.getElementById('bingo-title');
    
    // Set the title from config
    titleElement.innerText = bingoConfig.title;

    card.innerHTML = '';  // Clear existing content
    const shuffledArray = shuffle([...bingoConfig.options]); // Clone and shuffle

    // Get 3 random birthday events to add to the card
    const randomEvents = getRandomPartyEvents();

    // Add random events to the card options
    for (let i = 0; i < randomEvents.length; i++) {
        shuffledArray.push({ name: randomEvents[i], description: "Birthday Event" });
    }

    let count = 0;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.className = 'bingo-cell';

            // Center square is the free space
            if (i === 2 && j === 2) {
                cell.className += ' free-space';
                cell.innerHTML = '<strong>Free Space</strong>';
            } else {
                const { name, description } = shuffledArray[count++];
                cell.innerHTML = `<strong class="cell-name">${name}</strong><span class="cell-description">${description}</span>`;
            }

            card.appendChild(cell);
        }
    }
}


// Initial generation when page loads
window.onload = generateCard;
