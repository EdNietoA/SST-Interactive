document.addEventListener("DOMContentLoaded", () => {
    const person = document.getElementById("person");
    const eppOptions = document.querySelectorAll(".epp-option img");

    // Evento al comenzar a arrastrar un EPP
    eppOptions.forEach(img => {
        img.addEventListener("dragstart", (e) => {
            // Guardar la ruta de la imagen en el evento de arrastre
            e.dataTransfer.setData("text/plain", e.target.src);
        });
    });

    // Evento al soltar un EPP en la figura humana
    person.addEventListener("dragover", (e) => {
        e.preventDefault(); // Permitir soltar el elemento
    });

    person.addEventListener("drop", (e) => {
        e.preventDefault();
        const src = e.dataTransfer.getData("text/plain"); // Obtener la ruta de la imagen

        // Crear un nuevo elemento de EPP
        const eppItem = document.createElement("img");
        eppItem.src = src;
        eppItem.classList.add("epp-item");

        // Posicionar el EPP en la figura humana
        const rect = person.getBoundingClientRect();
        eppItem.style.position = "absolute";
        eppItem.style.top = `${e.clientY - rect.top - 25}px`; // Ajustar posición
        eppItem.style.left = `${e.clientX - rect.left - 25}px`; // Ajustar posición

        // Agregar el EPP a la figura humana
        person.appendChild(eppItem);
    });
});
