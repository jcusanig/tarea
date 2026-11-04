class RedLogistica {
    constructor() {
        this.puntos = new Map();
    }

    agregarPunto(nombrePunto) {
        if (this.puntos.has(nombrePunto) == false) {
            this.puntos.set(nombrePunto, []);
        }
    }

    conectarPuntos(puntoA, puntoB) {
        this.agregarPunto(puntoA);
        this.agregarPunto(puntoB);

        this.puntos.get(puntoA).push(puntoB);
        this.puntos.get(puntoB).push(puntoA);
    }

    encontrarRutaOptima(nodoInicio, nodoDestino) {
        // Inicializar
        let cola = []; // Cola (FIFO) para explorar los nodos
        let visitados = new Map(); // Registrar nodos ya visitados para evitar bucles
        let predecesores = new Map(); // Guardar de dónde proviene cada punto

        // Configurar el punto de partida
        cola.push(nodoInicio);
        visitados.set(nodoInicio, true);
        predecesores.set(nodoInicio, null);

        let encontrado = false;

        // Bucle principal para explorar nivel por nivel (BFS/VFS)
        while (cola.length > 0) {
            let nodoActual = cola.shift();

            if (nodoActual == nodoDestino) {
                encontrado = true;
                break;
            }

            let vecinos = this.puntos.get(nodoActual) || [];

            for (let vecino of vecinos) {
                if (visitados.has(vecino) == false) {
                    visitados.set(vecino, true);
                    predecesores.set(vecino, nodoActual);
                    cola.push(vecino);
                }
            }
        }

        if (encontrado == false) {
            console.log(`No hay ruta posible entre [${nodoInicio}] y [${nodoDestino}]`);
            return;
        }

        // Reconstrucción del camino desde el destino hasta el inicio
        let camino = [];
        let actual = nodoDestino;

        while (actual != null) {
            camino.unshift(actual);
            actual = predecesores.get(actual);
        }

        // Formato de salida requerido
        console.log(`Ruta de envío óptima de [${nodoInicio}] a [${nodoDestino}]: ${camino.join(" ➔ ")}`);
    }
}

// Instancia del sistema logístico
let redEnvios = new RedLogistica();

// Definición de conexiones entre los puntos logísticos
redEnvios.conectarPuntos("Almacén Central", "Hub Norte");
redEnvios.conectarPuntos("Almacén Central", "Hub Sur");
redEnvios.conectarPuntos("Hub Norte", "Centro de Acopio");
redEnvios.conectarPuntos("Hub Sur", "Centro de Acopio");
redEnvios.conectarPuntos("Centro de Acopio", "Destino Cliente");

// Búsqueda de la ruta óptima
redEnvios.encontrarRutaOptima("Almacén Central", "Destino Cliente");