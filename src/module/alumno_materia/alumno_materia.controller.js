import { AppDataSource } from "../../providers/datasource.provider.js";
import { AlumnoMateria } from "./entity/alumno_materia.entity.js";
import { Alumno } from "../alumno/entity/alumno.entity.js";
import { Materia } from "../materia/entity/materia.entity.js";

const alumnoMateriaRepo = AppDataSource.getRepository(AlumnoMateria);
const alumnoRepo = AppDataSource.getRepository(Alumno);
const materiaRepo = AppDataSource.getRepository(Materia);

export class AlumnoMateriaController {
  // 🔹 Obtener todas las matrículas
  static async obtenerMatriculas(req, res) {
    try {
      const matriculas = await alumnoMateriaRepo.find();
      res.json(matriculas);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las matrículas", detalle: error.message });
    }
  }

  // 🔹 Crear una matrícula (matricular alumno en materia)
  static async crearMatricula(req, res) {
    try {
      const { alumnoId, materiaId } = req.body;

      const alumno = await alumnoRepo.findOneBy({ id: alumnoId });
      const materia = await materiaRepo.findOneBy({ id: materiaId });

      if (!alumno || !materia) {
        return res.status(404).json({ error: "Alumno o Materia no encontrados" });
      }

      const nuevaMatricula = alumnoMateriaRepo.create({ alumno, materia });
      await alumnoMateriaRepo.save(nuevaMatricula);

      res.status(201).json({
        message: "Alumno matriculado correctamente ✅",
        data: nuevaMatricula,
      });
    } catch (error) {
      res.status(500).json({ error: "Error al matricular alumno", detalle: error.message });
    }
  }

  // 🔹 Eliminar matrícula
  static async eliminarMatricula(req, res) {
    try {
      const { id } = req.params;
      const matricula = await alumnoMateriaRepo.findOneBy({ id });

      if (!matricula) {
        return res.status(404).json({ error: "Matrícula no encontrada" });
      }

      await alumnoMateriaRepo.remove(matricula);
      res.json({ message: "Matrícula eliminada correctamente 🗑️" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar matrícula", detalle: error.message });
    }
  }
}
