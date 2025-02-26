document.addEventListener("DOMContentLoaded", () => {
    const person = document.getElementById("person");
    const eppOptions = document.querySelectorAll(".epp-option");

    // Función para crear un elemento de EPP arrastrable
    function createDraggableEPP(item, src) {
        const eppItem = document.createElement("div");
        eppItem.classList.add("epp-item");
        eppItem.dataset.item = item;

        // Crear una imagen para el EPP
        const img = document.createElement("img");
        img.src = src;
        img.alt = item;

        eppItem.appendChild(img);

        // Hacer el elemento arrastrable
        eppItem.draggable = true;

        // Evento al comenzar a arrastrar
        eppItem.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", JSON.stringify({ item, src }));
        });

        return eppItem;
    }

    // Evento al soltar un EPP en la figura humana
    person.addEventListener("dragover", (e) => {
        e.preventDefault(); // Permitir soltar el elemento
    });

    person.addEventListener("drop", (e) => {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData("text/plain"));
        const { item, src } = data;

        // Crear y colocar el EPP en la figura humana
        const eppItem = createDraggableEPP(item, src);
        const rect = person.getBoundingClientRect();
        eppItem.style.top = `${e.clientY - rect.top - 25}px`; // Ajustar posición
        eppItem.style.left = `${e.clientX - rect.left - 25}px`; // Ajustar posición
        person.appendChild(eppItem);
    });

    // Asignar eventos a las opciones de EPP
    eppOptions.forEach(option => {
        option.addEventListener("dragstart", (e) => {
            const item = option.dataset.item;
            const src = option.querySelector("img").src;
            e.dataTransfer.setData("text/plain", JSON.stringify({ item, src }));
        });
    });
});
