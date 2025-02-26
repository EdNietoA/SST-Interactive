document.addEventListener("DOMContentLoaded", () => {
    function checkAnswer(isCorrect) {
        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = "";

        if (isCorrect) {
            const checkImage = document.createElement("img");
            checkImage.src = "check.png";
            checkImage.alt = "Correcto";
            resultDiv.appendChild(checkImage);
            alert("¡Correcto! Levantar objetos pesados doblándose por las rodillas es más seguro.");
        } else {
            const xImage = document.createElement("img");
            xImage.src = "x.png";
            xImage.alt = "Incorrecto";
            resultDiv.appendChild(xImage);
            alert("Incorrecto. Levantar objetos pesados doblándose por la cintura puede causar lesiones.");
        }
    }

    // Hacer la función accesible globalmente
    window.checkAnswer = checkAnswer;
});
