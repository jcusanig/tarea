class SistemaEvacuacion {
    constructor() {
        this.mapaEdificio = new Map();
    }

    agregarUbicacion(ubicacion) {
        if (this.mapaEdificio.has(ubicacion) == false) {
            this.mapaEdificio.set(ubicacion, []);
        }
    }

    conectarUbicaciones(ubicacionX, ubicacionY) {
        this.agregarUbicacion(ubicacionX);
        this.agregarUbicacion(ubicacionY);

        this.mapaEdificio.get(ubicacionX).push(ubicacionY);
        this.mapaEdificio.get(ubicacionY).push(ubicacionX);
    }

    encontrarRutaEvacuacion(nodoInicio, nodoDestino) {
        // Inicializar
        let cola = []; // Cola (FIFO) para explorar las ubicaciones
        let visitados = new Map(); // Registrar ubicaciones visitadas y evitar bucles
        let predecesores = new Map(); // Guardamos quién descubrió a quién para reconstruir la ruta

        // Configurar el punto de partida
        cola.push(nodoInicio);
        visitados.set(nodoInicio, true);
        predecesores.set(nodoInicio, null);

        let encontrado = false;

        // Bucle principal para explorar nivel por nivel
        while (cola.length > 0) {
            let nodoActual = cola.shift();

            if (nodoActual == nodoDestino) {
                encontrado = true;
                break;
            }

            let vecinos = this.mapaEdificio.get(nodoActual) || [];

            for (let vecino of vecinos) {
                if (visitados.has(vecino) == false) {
                    visitados.set(vecino, true);
                    predecesores.set(vecino, nodoActual);
                    cola.push(vecino);
                }
            }
        }

        if (encontrado == false) {
            console.log(`No hay ruta de evacuación posible entre [${nodoInicio}] y [${nodoDestino}]`);
            return;
        }

        // Reconstrucción del camino desde destino al inicio
        let camino = [];
        let actual = nodoDestino;

        while (actual != null) {
            camino.unshift(actual);
            actual = predecesores.get(actual);
        }

        // Formato exacto de salida requerido
        console.log(`Ruta de evacuación segura de [${nodoInicio}] a [${nodoDestino}]: ${camino.join(" ➔ ")}`);
    }
}

// Creación e inicialización del sistema
let edificio = new SistemaEvacuacion();

// Conexiones de la red de evacuación
edificio.conectarUbicaciones("Oficina 502", "Pasillo Principal");
edificio.conectarUbicaciones("Pasillo Principal", "Escalera Este");
edificio.conectarUbicaciones("Escalera Este", "Zona Segura");

// Ejecutar búsqueda de la ruta más rápida
edificio.encontrarRutaEvacuacion("Oficina 502", "Zona Segura");