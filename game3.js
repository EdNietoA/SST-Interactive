document.addEventListener("DOMContentLoaded", () => {
    const person = document.getElementById("person");
    const draggableItems = document.querySelectorAll(".draggable");
    const modal = document.getElementById("instructionModal");

    // Mostrar el modal al cargar la página
    modal.style.display = "flex";

    // Tamaños y posiciones personalizadas para cada EPP (más pequeños)
    const eppSizes = {
        casco: { width: "40px", height: "40px", top: "20px", left: "80px" }, // Ajuste para el casco
        gafas: { width: "25px", height: "15px", top: "95px", left: "90px" }, // Ajuste para las gafas
        guantes: { width: "20px", height: "20px", top: "210px", left: "35px" }, // Ajuste para los guantes
        chaleco: { width: "60px", height: "80px", top: "160px", left: "70px" }, // Ajuste para el chaleco
        botas: { width: "30px", height: "50px", top: "330px", left: "85px" }, // Ajuste para las botas
    };

    // Para evitar múltiples colocaciones
    const placedItems = new Set();

    let selectedItem = null;

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
        document.body.appendChild(selectedItem);
        moveItem(e);
    }

    // Función para mover el elemento (touch o clic)
    function moveItem(e) {
        if (selectedItem) {
            const touch = e.touches ? e.touches[0] : e;
            selectedItem.style.top = `${touch.clientY - 25}px`;
            selectedItem.style.left = `${touch.clientX - 25}px`;
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

                // Aplicar tamaño y posición personalizada según el tipo de EPP
                if (eppSizes[itemType]) {
                    newItem.style.width = eppSizes[itemType].width;
                    newItem.style.height = eppSizes[itemType].height;
                    newItem.style.top = eppSizes[itemType].top;
                    newItem.style.left = eppSizes[itemType].left;
                }

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
