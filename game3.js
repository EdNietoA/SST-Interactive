document.addEventListener("DOMContentLoaded", () => {
    const person = document.getElementById("person");
    const draggableItems = document.querySelectorAll(".draggable");
    const modal = document.getElementById("instructionModal");

    // Mostrar el modal al cargar la página
    modal.style.display = "flex";

    // Tamaños personalizados para cada EPP (ajustados para ser más pequeños)
    const eppSizes = {
        casco: { width: "40px", height: "40px" }, // Ajuste para el casco
        gafas: { width: "20px", height: "15px" }, // Ajuste para las gafas
        guantes: { width: "20px", height: "20px" }, // Ajuste para los guantes
        chaleco: { width: "50px", height: "70px" }, // Ajuste para el chaleco
        botas: { width: "25px", height: "40px" }, // Ajuste para las botas
    };

    // Zonas específicas para cada EPP (coordenadas relativas a la figura humana)
    const eppZones = {
        casco: { top: "10px", left: "75px" }, // Zona para el casco
        gafas: { top: "60px", left: "80px" }, // Zona para las gafas
        guantes: { top: "200px", left: "50px" }, // Zona para los guantes
        chaleco: { top: "150px", left: "60px" }, // Zona para el chaleco
        botas: { top: "350px", left: "70px" }, // Zona para las botas
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
        selectedItem.style.width = eppSizes[itemType].width; // Aplicar tamaño inicial
        selectedItem.style.height = eppSizes[itemType].height; // Aplicar tamaño inicial
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
            const itemType = selectedItem.alt.toLowerCase();

            // Verificar si el elemento se soltó dentro de la figura humana
            if (
                touch.clientX >= rect.left &&
                touch.clientX <= rect.right &&
                touch.clientY >= rect.top &&
                touch.clientY <= rect.bottom
            ) {
                const newItem = selectedItem.cloneNode(true);
                newItem.classList.add("epp-item");

                // Aplicar tamaño personalizado según el tipo de EPP
                if (eppSizes[itemType]) {
                    newItem.style.width = eppSizes[itemType].width;
                    newItem.style.height = eppSizes[itemType].height;
                }

                // Posicionar el EPP en la zona específica
                if (eppZones[itemType]) {
                    newItem.style.top = eppZones[itemType].top;
                    newItem.style.left = eppZones[itemType].left;
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
