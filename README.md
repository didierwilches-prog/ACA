# Gestión de Estudiantes Universitarios — Node.js + Express

Proyecto para la actividad ACA: manejo y procesamiento de un array de objetos
de estudiantes mediante funciones independientes, expuestas además como una
API REST con Express.

**Restricción respetada:** ninguna función usa `filter`, `map`, `forEach`,
`find`, `reduce` ni métodos similares de orden superior. Todo el procesamiento
de arrays se hace con `for`, `while`, `do...while`, `if` y operador ternario.

## Estructura del proyecto

```
estudiantes-app/
├── data/
│   └── estudiantes.js      # Array de objetos (datos base)
├── functions/
│   └── estudiantes.js      # Todas las funciones pedidas (lógica pura)
├── demo.js                 # Ejecuta y muestra por consola cada función
├── server.js               # API Express que expone cada función
├── evidencia-ejecucion.txt # Salida de consola de "node demo.js"
├── package.json
└── README.md
```

## Requerimientos implementados (`functions/estudiantes.js`)

1. `calcularPromedio(estudiante)` — promedio de notas de un estudiante.
2. `buscarEstudiantePorId(lista, id)` — búsqueda por id.
3. `buscarEstudiantePorNombre(lista, nombre)` — búsqueda parcial por nombre.
4. `filtrarPorCarrera(lista, carrera)` — filtra por carrera.
5. `filtrarPorSemestre(lista, semestre)` — filtra por semestre.
6. `obtenerAprobados(lista)` — estudiantes con promedio >= 3.0.
7. `obtenerReprobados(lista)` — estudiantes con promedio < 3.0.
8. `calcularPromedioGeneral(lista)` — promedio de todo el curso.
9. `contarPorCarrera(lista)` — cantidad de estudiantes por carrera.
10. `generarReporte(lista)` — reporte consolidado (totales, % aprobación,
    promedio general, conteo por carrera).

## Cómo ejecutar

### 1. Instalar dependencias

```bash
npm install
```

### 2. Ver la evidencia de ejecución por consola (sin servidor)

```bash
npm run demo
```

Esto corre `demo.js`, que llama a cada función y muestra el resultado en la
consola (ver también `evidencia-ejecucion.txt` con una salida ya generada).

### 3. Levantar la API con Express

```bash
npm start
```

El servidor queda escuchando en `http://localhost:3000`.

## Endpoints disponibles

| Método | Ruta                                   | Descripción                              |
|--------|-----------------------------------------|-------------------------------------------|
| GET    | `/`                                     | Documentación de rutas                    |
| GET    | `/estudiantes`                          | Lista todos los estudiantes               |
| GET    | `/estudiantes/:id`                      | Estudiante por id (incluye su promedio)   |
| GET    | `/estudiantes/buscar?nombre=texto`      | Búsqueda parcial por nombre               |
| GET    | `/estudiantes/carrera/:carrera`         | Filtra por carrera                        |
| GET    | `/estudiantes/semestre/:semestre`       | Filtra por semestre                       |
| GET    | `/estudiantes/aprobados`                | Estudiantes aprobados (promedio >= 3.0)   |
| GET    | `/estudiantes/reprobados`               | Estudiantes reprobados (promedio < 3.0)   |
| GET    | `/estudiantes/promedio-general`         | Promedio general del curso                |
| GET    | `/estudiantes/por-carrera`              | Conteo de estudiantes por carrera         |
| GET    | `/reporte`                              | Reporte general consolidado               |

### Ejemplos con curl

```bash
curl http://localhost:3000/estudiantes
curl http://localhost:3000/estudiantes/5
curl "http://localhost:3000/estudiantes/buscar?nombre=ramirez"
curl http://localhost:3000/estudiantes/carrera/Derecho
curl http://localhost:3000/estudiantes/semestre/5
curl http://localhost:3000/estudiantes/aprobados
curl http://localhost:3000/estudiantes/reprobados
curl http://localhost:3000/reporte
```

## Notas de diseño

- Los datos (`data/estudiantes.js`) están separados de la lógica
  (`functions/estudiantes.js`) para favorecer la organización y reutilización
  del código, tal como pide la actividad.
- `obtenerAprobados` y `obtenerReprobados` devuelven copias de los objetos
  originales (usando el operador de propagación `{ ...estudiante }`, que no
  es un método de array) agregando el campo `promedio` calculado.
- El umbral de aprobación (`NOTA_APROBATORIA = 3.0`) está centralizado en una
  constante al inicio del archivo de funciones, fácil de ajustar si la
  actividad exige otro criterio.
