const asistentes = [
    { dni: "72849102", nombre: "Lucía Mendoza", entrada: "VIP" },
    { dni: "45192034", nombre: "Mateo Vargas", entrada: "General" },
    { dni: "80129384", nombre: "Sofía Castro", entrada: "Estudiante" },
    { dni: "10293847", nombre: "Diego Paredes", entrada: "VIP" },
    { dni: "65748392", nombre: "Valeria Ríos", entrada: "General" }
];

function verificarIngreso(listaAsistentes, dniBuscado) {
    let pasos = 0;

    for (let i = 0; i < listaAsistentes.length; i++) {
        pasos++; // Se incrementa en cada comparación realizada

        if (listaAsistentes[i].dni === dniBuscado) {
            const asistente = listaAsistentes[i];
            return `¡Bienvenido/a, ${asistente.nombre}! Tipo de entrada: ${asistente.entrada}. (Pasos realizados: ${pasos})`;
        }
    }

    return `Acceso denegado: DNI no registrado. (Pasos realizados: ${pasos})`;
}

// --- Ejemplos de prueba ---
console.log(verificarIngreso(asistentes, "80129384"));
// Salida: ¡Bienvenido/a, Sofía Castro! Tipo de entrada: Estudiante. (Pasos realizados: 3)

console.log(verificarIngreso(asistentes, "72849102"));
// Salida: ¡Bienvenido/a, Lucía Mendoza! Tipo de entrada: VIP. (Pasos realizados: 1)

console.log(verificarIngreso(asistentes, "99999999"));
// Salida: Acceso denegado: DNI no registrado. (Pasos realizados: 5)