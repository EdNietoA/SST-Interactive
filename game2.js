document.addEventListener("DOMContentLoaded", () => {
    // Definir las parejas de cartas con temas de SST
    const cards = [
        { id: 1, content: "EPP" }, // Equipo de Protección Personal
        { id: 2, content: "EPP" },
        { id: 3, content: "Riesgo Eléctrico" },
        { id: 4, content: "Riesgo Eléctrico" },
        { id: 5, content: "Prevención de Incendios" },
        { id: 6, content: "Prevención de Incendios" },
        { id: 7, content: "Ergonomía" },
        { id: 8, content: "Ergonomía" },
        { id: 9, content: "Señalización" },
        { id: 10, content: "Señalización" },
        { id: 11, content: "Primeros Auxilios" },
        { id: 12, content: "Primeros Auxilios" },
    ];

    // Mezclar cartas usando el algoritmo de Fisher-Yates
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const shuffledCards = shuffleArray(cards);
    const gameBoard = document.getElementById("game-board");
    let flippedCards = [];
    let matchedPairs = 0;

    // Crear cartas en el tablero de juego
    shuffledCards.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.dataset.id = card.id;
        cardElement.dataset.content = card.content;
        cardElement.innerText = "?"; // Texto inicial oculto
        cardElement.addEventListener("click", flipCard);
        gameBoard.appendChild(cardElement);
    });

    // Función para voltear una carta
    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
            this.classList.add("flipped");
            this.innerText = this.dataset.content; // Mostrar el contenido de la carta
            flippedCards.push(this);
            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 1000); // Verificar coincidencia después de 1 segundo
            }
        }
    }

    // Función para verificar si las cartas coinciden
    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.content === card2.dataset.content) {
            matchedPairs++;
            flippedCards = [];
            if (matchedPairs === cards.length / 2) {
                document.getElementById("message").innerText = "¡Has encontrado todas las parejas!";
            }
        } else {
            // Voltear las cartas de nuevo si no coinciden
            card1.classList.remove("flipped");
            card1.innerText = "?";
            card2.classList.remove("flipped");
            card2.innerText = "?";
            flippedCards = [];
        }
    }
});
