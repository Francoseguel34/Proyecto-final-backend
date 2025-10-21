import express from "express";
import { AlumnoMateriaController } from "./alumno_materia.controller.js";

const router = express.Router();

// GET → obtener todas las matrículas
router.get("/", AlumnoMateriaController.obtenerMatriculas);

// POST → crear nueva matrícula (requiere alumnoId y materiaId)
router.post("/", AlumnoMateriaController.crearMatricula);

// DELETE → eliminar una matrícula por id
router.delete("/:id", AlumnoMateriaController.eliminarMatricula);

export default router;
