document.addEventListener("DOMContentLoaded", () => {
    const person = document.getElementById("person");
    const eppOptions = document.querySelectorAll(".epp-option");

    // Posiciones predefinidas para los EPP en la figura humana
    const eppPositions = {
        casco: { top: "10px", left: "70px" },
        gafas: { top: "80px", left: "70px" },
        guantes: { top: "200px", left: "20px" },
        chaleco: { top: "150px", left: "50px" },
        botas: { top: "320px", left: "70px" },
    };

    // Función para colocar un EPP en la figura humana
    function placeEPP(item) {
        const eppItem = document.createElement("div");
        eppItem.classList.add("epp-item");
        eppItem.dataset.item = item;

        // Crear una imagen para el EPP
        const img = document.createElement("img");
        img.src = `${item}.png`; // Asume que las imágenes tienen nombres como "casco.png", "gafas.png", etc.
        img.alt = item;

        eppItem.appendChild(img);
        eppItem.style.top = eppPositions[item].top;
        eppItem.style.left = eppPositions[item].left;
        person.appendChild(eppItem);
    }

    // Asignar eventos a las opciones de EPP
    eppOptions.forEach(option => {
        option.addEventListener("click", () => {
            const item = option.dataset.item;
            placeEPP(item);
        });
    });
});

