import { AppDataSource } from "../../providers/datasource.provider.js";

const alumnoMateriaRepo = AppDataSource.getRepository("AlumnoMateria");
const alumnoRepo = AppDataSource.getRepository("Alumno");
const materiaRepo = AppDataSource.getRepository("Materia");

export class AlumnoMateriaController {
  //  Obtener todas las matrículas
  static async obtenerMatriculas(req, res) {
    try {
      const matriculas = await alumnoMateriaRepo.find({
        relations: ["alumno", "materia"], 
      });
      res.json(matriculas);
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener las matrículas",
        detalle: error.message,
      });
    }
  }

  // Crear matrícula
  static async crearMatricula(req, res) {
    try {
      const { alumnoId, materiaId } = req.body;

      const alumno = await alumnoRepo.findOneBy({ id: alumnoId });
      const materia = await materiaRepo.findOneBy({ id: materiaId });

      if (!alumno || !materia) {
        return res
          .status(404)
          .json({ error: "Alumno o materia no encontrados" });
      }

      // Crear usando relaciones directas
      const nuevaMatricula = alumnoMateriaRepo.create({
        alumno,
        materia,
      });

      await alumnoMateriaRepo.save(nuevaMatricula);

      res.status(201).json({
        message: "Alumno matriculado correctamente ✅",
        data: nuevaMatricula,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error al matricular alumno",
        detalle: error.message,
      });
    }
  }

  // Eliminar matrícula
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
      res.status(500).json({
        error: "Error al eliminar matrícula",
        detalle: error.message,
      });
    }
  }
}
