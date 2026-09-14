// demo.js
// Ejecuta: node demo.js
// Muestra en consola el resultado de cada función como evidencia de ejecución.

const estudiantes = require("./data/estudiantes");
const {
  calcularPromedio,
  buscarEstudiantePorId,
  buscarEstudiantePorNombre,
  filtrarPorCarrera,
  filtrarPorSemestre,
  obtenerAprobados,
  obtenerReprobados,
  calcularPromedioGeneral,
  contarPorCarrera,
  generarReporte,
} = require("./functions/estudiantes");

console.log("=== 1. Listado completo de estudiantes ===");
console.log(estudiantes);

console.log("\n=== 2. Promedio individual (id 1 - Ana Torres) ===");
console.log(calcularPromedio(estudiantes[0]));

console.log("\n=== 3. Buscar estudiante por id (id = 5) ===");
console.log(buscarEstudiantePorId(estudiantes, 5));

console.log("\n=== 4. Buscar estudiante por nombre ('ram') ===");
console.log(buscarEstudiantePorNombre(estudiantes, "ram"));

console.log("\n=== 5. Filtrar por carrera ('Ingeniería de Sistemas') ===");
console.log(filtrarPorCarrera(estudiantes, "Ingeniería de Sistemas"));

console.log("\n=== 6. Filtrar por semestre (5) ===");
console.log(filtrarPorSemestre(estudiantes, 5));

console.log("\n=== 7. Estudiantes aprobados (promedio >= 3.0) ===");
console.log(obtenerAprobados(estudiantes));

console.log("\n=== 8. Estudiantes reprobados (promedio < 3.0) ===");
console.log(obtenerReprobados(estudiantes));

console.log("\n=== 9. Promedio general del curso ===");
console.log(calcularPromedioGeneral(estudiantes));

console.log("\n=== 10. Conteo de estudiantes por carrera ===");
console.log(contarPorCarrera(estudiantes));

console.log("\n=== 11. Reporte general ===");
console.log(generarReporte(estudiantes));
