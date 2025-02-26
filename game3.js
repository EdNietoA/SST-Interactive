document.addEventListener("DOMContentLoaded", () => {
    const person = document.getElementById("person");
    const eppOptions = document.querySelectorAll(".epp-option");

    // Función para crear un elemento de EPP arrastrable
    function createDraggableEPP(item) {
        const eppItem = document.createElement("div");
        eppItem.classList.add("epp-item");
        eppItem.dataset.item = item;

        // Crear una imagen para el EPP
        const img = document.createElement("img");
        img.src = `${item}.png`; // Asume que las imágenes tienen nombres como "casco.png", "gafas.png", etc.
        img.alt = item;

        eppItem.appendChild(img);

        // Hacer el elemento arrastrable
        eppItem.draggable = true;

        // Evento al comenzar a arrastrar
        eppItem.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", item);
        });

        return eppItem;
    }

    // Evento al soltar un EPP en la figura humana
    person.addEventListener("dragover", (e) => {
        e.preventDefault(); // Permitir soltar el elemento
    });

    person.addEventListener("drop", (e) => {
        e.preventDefault();
        const item = e.dataTransfer.getData("text/plain");

        // Crear y colocar el EPP en la figura humana
        const eppItem = createDraggableEPP(item);
        const rect = person.getBoundingClientRect();
        eppItem.style.top = `${e.clientY - rect.top - 25}px`; // Ajustar posición
        eppItem.style.left = `${e.clientX - rect.left - 25}px`; // Ajustar posición
        person.appendChild(eppItem);
    });

    // Asignar eventos a las opciones de EPP
    eppOptions.forEach(option => {
        option.addEventListener("click", () => {
            const item = option.dataset.item;
            const eppItem = createDraggableEPP(item);
            document.body.appendChild(eppItem);

            // Posicionar el EPP cerca del cursor
            eppItem.style.position = "absolute";
            eppItem.style.top = `${event.clientY}px`;
            eppItem.style.left = `${event.clientX}px`;
        });
    });
});
