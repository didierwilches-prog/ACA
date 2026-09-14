// server.js
// Levanta una API REST con Express que expone cada función del
// módulo functions/estudiantes.js como un endpoint independiente.
//
// Ejecutar: npm install  ->  npm start
// Servidor por defecto en: http://localhost:3000

const express = require("express");
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

const app = express();
const PORT = 3000;

app.use(express.json());

// Página raíz: documentación mínima de las rutas disponibles
app.get("/", (req, res) => {
  res.json({
    mensaje: "API de gestión de estudiantes universitarios",
    rutas: [
      "GET  /estudiantes",
      "GET  /estudiantes/:id",
      "GET  /estudiantes/buscar?nombre=texto",
      "GET  /estudiantes/carrera/:carrera",
      "GET  /estudiantes/semestre/:semestre",
      "GET  /estudiantes/aprobados",
      "GET  /estudiantes/reprobados",
      "GET  /estudiantes/promedio-general",
      "GET  /estudiantes/por-carrera",
      "GET  /reporte",
    ],
  });
});

// 1. Listar todos los estudiantes
app.get("/estudiantes", (req, res) => {
  res.json(estudiantes);
});

// 2. Buscar estudiante por nombre (query param) -> antes de "/:id"
app.get("/estudiantes/buscar", (req, res) => {
  const nombre = req.query.nombre;

  if (!nombre) {
    res.status(400).json({ error: "Debe indicar el parámetro 'nombre'." });
    return;
  }

  const resultado = buscarEstudiantePorNombre(estudiantes, nombre);
  res.json(resultado);
});

// 3. Filtrar por carrera
app.get("/estudiantes/carrera/:carrera", (req, res) => {
  const resultado = filtrarPorCarrera(estudiantes, req.params.carrera);
  res.json(resultado);
});

// 4. Filtrar por semestre
app.get("/estudiantes/semestre/:semestre", (req, res) => {
  const semestre = Number(req.params.semestre);
  const resultado = filtrarPorSemestre(estudiantes, semestre);
  res.json(resultado);
});

// 5. Estudiantes aprobados
app.get("/estudiantes/aprobados", (req, res) => {
  res.json(obtenerAprobados(estudiantes));
});

// 6. Estudiantes reprobados
app.get("/estudiantes/reprobados", (req, res) => {
  res.json(obtenerReprobados(estudiantes));
});

// 7. Promedio general del curso
app.get("/estudiantes/promedio-general", (req, res) => {
  res.json({ promedioGeneral: calcularPromedioGeneral(estudiantes) });
});

// 8. Conteo de estudiantes por carrera
app.get("/estudiantes/por-carrera", (req, res) => {
  res.json(contarPorCarrera(estudiantes));
});

// 9. Reporte general
app.get("/reporte", (req, res) => {
  res.json(generarReporte(estudiantes));
});

// 10. Buscar estudiante por id + su promedio individual
app.get("/estudiantes/:id", (req, res) => {
  const id = Number(req.params.id);
  const estudiante = buscarEstudiantePorId(estudiantes, id);

  if (estudiante === null) {
    res.status(404).json({ error: "Estudiante no encontrado." });
    return;
  }

  res.json({ ...estudiante, promedio: calcularPromedio(estudiante) });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
