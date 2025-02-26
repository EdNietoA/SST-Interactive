document.addEventListener("DOMContentLoaded", () => {
    const person = document.getElementById("person");
    const draggableItems = document.querySelectorAll(".draggable");

    let selectedItem = null;

    // Función para manejar el inicio del arrastre (touch o clic)
    function startDrag(e) {
        e.preventDefault();
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
                newItem.style.position = "absolute";
                newItem.style.top = `${touch.clientY - rect.top - 25}px`;
                newItem.style.left = `${touch.clientX - rect.left - 25}px`;
                newItem.style.pointerEvents = "auto";
                person.appendChild(newItem);
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
});
