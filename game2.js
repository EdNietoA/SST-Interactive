document.addEventListener("DOMContentLoaded", () => {
    const cards = [
        { id: 1, content: "A" },
        { id: 2, content: "A" },
        { id: 3, content: "B" },
        { id: 4, content: "B" },
        { id: 5, content: "C" },
        { id: 6, content: "C" },
        // Añade más pares de cartas según sea necesario
    ];

    // Duplicar y mezclar cartas
    const shuffledCards = cards.sort(() => 0.5 - Math.random());

    const gameBoard = document.getElementById("game-board");
    let flippedCards = [];
    let matchedPairs = 0;

    // Crear cartas en el tablero de juego
    shuffledCards.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.dataset.id = card.id;
        cardElement.dataset.content = card.content;
        cardElement.innerText = "?";
        cardElement.addEventListener("click", flipCard);
        gameBoard.appendChild(cardElement);
    });

    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
            this.classList.add("flipped");
            this.innerText = this.dataset.content;
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 1000);
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.content === card2.dataset.content) {
            matchedPairs++;
            flippedCards = [];
            if (matchedPairs === cards.length / 2) {
                document.getElementById("message").innerText = "¡Has encontrado todas las parejas!";
            }
        } else {
            card1.classList.remove("flipped");
            card1.innerText = "?";
            card2.classList.remove("flipped");
            card2.innerText = "?";
            flippedCards = [];
        }
    }
});