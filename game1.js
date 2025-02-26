document.addEventListener("DOMContentLoaded", () => {
    function checkAnswer(isCorrect) {
        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = "";

        if (isCorrect) {
            alert("¡Correcto! Levantar objetos pesados doblándose por las rodillas es más seguro.");
            const checkImage = document.createElement("img");
            checkImage.src = "check.png";
            checkImage.alt = "Correcto";
            checkImage.className = "result-image";
            resultDiv.appendChild(checkImage);
        } else {
            alert("Incorrecto. Levantar objetos pesados doblándose por la cintura puede causar lesiones.");
            const xImage = document.createElement("img");
            xImage.src = "x.png";
            xImage.alt = "Incorrecto";
            xImage.className = "result-image";
            resultDiv.appendChild(xImage);
        }
    }

    // Hacer la función accesible globalmente
    window.checkAnswer = checkAnswer;
});
