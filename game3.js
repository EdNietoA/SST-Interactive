document.addEventListener("DOMContentLoaded", () => {
    const person = document.getElementById("person");
    const draggableItems = document.querySelectorAll(".draggable");
    const modal = document.getElementById("instructionModal");

    // Mostrar el modal al cargar la página
    modal.style.display = "flex";

    // Tamaños personalizados para cada EPP (más pequeños)
    const eppSizes = {
        casco: { width: "40px", height: "40px" }, // Ajuste para el casco
        gafas: { width: "20px", height: "15px" }, // Ajuste para las gafas
        guantes: { width: "20px", height: "20px" }, // Ajuste para los guantes
        chaleco: { width: "50px", height: "70px" }, // Ajuste para el chaleco
        botas: { width: "25px", height: "40px" }, // Ajuste para las botas
    };

    // Para evitar múltiples colocaciones
    const placedItems = new Set();

    let selectedItem = null;
    let offsetX = 0;
    let offsetY = 0;

    // Función para iniciar el juego
    function startGame() {
        modal.style.display = "none"; // Ocultar el modal
    }

    // Función para manejar el inicio del arrastre (touch o clic)
    function startDrag(e) {
        e.preventDefault();
        const itemType = e.target.alt.toLowerCase();

        // Verificar si el EPP ya fue colocado
        if (placedItems.has(itemType)) {
            alert("Este EPP ya ha sido colocado.");
            return;
        }

        selectedItem = e.target.cloneNode(true); // Clonar la imagen seleccionada
        selectedItem.classList.add("epp-item"); // Aplicar estilos de EPP
        selectedItem.style.position = "absolute";
        selectedItem.style.pointerEvents = "none"; // Evitar interferencias
        selectedItem.style.width = eppSizes[itemType].width; // Aplicar tamaño inicial
        selectedItem.style.height = eppSizes[itemType].height; // Aplicar tamaño inicial

        // Calcular el offset (diferencia entre el clic y la posición del elemento)
        const rect = e.target.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        document.body.appendChild(selectedItem);
        moveItem(e);
    }

    // Función para mover el elemento (touch o clic)
    function moveItem(e) {
        if (selectedItem) {
            const touch = e.touches ? e.touches[0] : e;
            selectedItem.style.top = `${touch.clientY - offsetY}px`;
            selectedItem.style.left = `${touch.clientX - offsetX}px`;
        }
    }

    // Función para finalizar el arrastre (touch o clic)
    function endDrag(e) {
        if (selectedItem) {
            const rect = person.getBoundingClientRect();
            const touch = e.touches ? e.changedTouches[0] : e;

            // Verificar si el elemento se soltó dentro de la figura humana
            if (
                touch.clientX >= rect.left &&
                touch.clientX <= rect.right &&
                touch.clientY >= rect.top &&
                touch.clientY <= rect.bottom
            ) {
                const newItem = selectedItem.cloneNode(true);
                newItem.classList.add("epp-item");
                const itemType = selectedItem.alt.toLowerCase();

                // Aplicar tamaño personalizado según el tipo de EPP
                if (eppSizes[itemType]) {
                    newItem.style.width = eppSizes[itemType].width;
                    newItem.style.height = eppSizes[itemType].height;
                }

                // Posicionar el EPP donde se soltó
                newItem.style.top = `${touch.clientY - rect.top - offsetY}px`;
                newItem.style.left = `${touch.clientX - rect.left - offsetX}px`;
                newItem.style.pointerEvents = "auto";
                person.appendChild(newItem);

                // Marcar el EPP como colocado
                placedItems.add(itemType);
            }

            // Eliminar el elemento clonado
            document.body.removeChild(selectedItem);
            selectedItem = null;
        }
    }

    // Asignar eventos a las imágenes arrastrables
    draggableItems.forEach(item => {
        item.addEventListener("mousedown", startDrag);
        item.addEventListener("touchstart", startDrag);
    });

    // Asignar eventos de movimiento y fin de arrastre
    document.addEventListener("mousemove", moveItem);
    document.addEventListener("touchmove", moveItem);
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("touchend", endDrag);

    // Hacer la función startGame accesible globalmente
    window.startGame = startGame;
});
