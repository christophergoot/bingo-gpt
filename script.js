// Make sure data.js is loaded before running this script

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function getRandomPartyEvents(count = 2) {
	const shuffledEvents = shuffle([...bingoConfig.events]);
	return shuffledEvents.slice(0, count);
}

// Function to insert an item at a random position in an array
function insertAtRandomPosition(array, item) {
	const randomIndex = Math.floor(Math.random() * (array.length + 1));
	array.splice(randomIndex, 0, item);
}

// When generating the card, you can add the random events like this:
function generateCard() {
	const card = document.getElementById("bingo-card");
	const titleElement = document.getElementById("bingo-title");

	// Set the title from config
	titleElement.innerText = bingoConfig.title;

	card.innerHTML = ""; // Clear existing content
	const shuffledArray = shuffle([...bingoConfig.options]); // Clone and shuffle

	// Get 3 random birthday events to add to the card
	const randomEvents = getRandomPartyEvents();

	for (let i = 0; i < randomEvents.length; i++) {
		insertAtRandomPosition(shuffledArray, { name: randomEvents[i], description: "" });
	}

	let count = 0;
	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < 5; j++) {
			const cell = document.createElement("div");
			cell.className = "bingo-cell";

			// Center square is the free space
			if (i === 2 && j === 2) {
				cell.className += " free-space";
				cell.innerHTML = "<strong>Free Space</strong>";
			} else {
				const { name, description } = shuffledArray[count++];
				cell.innerHTML = `<strong class="cell-name">${name}</strong><span class="cell-description">${description}</span>`;
			}

			card.appendChild(cell);
			adjustFontSize(cell);
		}
	}
}

function adjustFontSize(element) {
	const containerWidth = element.offsetWidth;
	const containerHeight = element.offsetHeight;

	console.log(containerWidth, containerHeight);
	let fontSize = 100; // Start with a large font size
	element.style.fontSize = `${fontSize}px`;

	while (element.scrollHeight > containerHeight - 4 || element.scrollWidth > containerWidth - 4) {
		fontSize--;
		element.style.fontSize = `${fontSize}px`;
	}
}

// Initial generation when page loads
window.onload = generateCard;
