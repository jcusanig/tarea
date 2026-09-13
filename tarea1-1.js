class EditorTexto {
    constructor() {
        this.contenido = "";
        // La pila guardará el historial de estados previos del texto
        this.historial = [];
    }

    // Método para escribir/añadir nuevo texto
    escribir(nuevoTexto) {
        // 1. Guardamos el estado actual en la pila antes de modificarlo
        this.historial.push(this.contenido);

        // 2. Aplicamos el cambio
        this.contenido += nuevoTexto;
        console.log(`[Escribió]: "${nuevoTexto}" | Texto actual: "${this.contenido}"`);
    }

    // Método para deshacer el último cambio
    deshacer() {
        if (this.historial.length === 0) {
            console.log("⚠️ No hay cambios para deshacer.");
            return;
        }

        // Extraemos el último estado guardado en la pila
        this.contenido = this.historial.pop();
        console.log(`[Deshacer]: Texto restaurado a -> "${this.contenido}"`);
    }

    // Ver el texto actual
    mostrarTexto() {
        console.log(`📄 Estado actual del editor: "${this.contenido}"`);
    }
}

// --- PRUEBA DEL CÓDIGO ---
const miEditor = new EditorTexto();

miEditor.escribir("Hola ");
miEditor.escribir("mundo. ");
miEditor.escribir("Este es un error.");

miEditor.mostrarTexto(); // Salida: "Hola mundo. Este es un error."

console.log("\n--- Presionando Deshacer ---");
miEditor.deshacer(); // Elimina "Este es un error."
miEditor.mostrarTexto(); // Salida: "Hola mundo. "

miEditor.deshacer(); // Elimina "mundo. "
miEditor.mostrarTexto(); // Salida: "Hola "

miEditor.deshacer(); // Elimina "Hola "
miEditor.mostrarTexto(); // Salida: ""

miEditor.deshacer(); // Intenta deshacer cuando ya está vacío