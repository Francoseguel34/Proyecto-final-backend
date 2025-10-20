import AppDataSource from "../../providers/datasource.provider.js";
import { alumnoEntity } from "./entity/alumno.entity.js";

// Crear alumno
export const createAlumno = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(alumnoEntity);
    const alumno = repo.create(req.body);
    const nuevo = await repo.save(alumno);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: "Error al crear alumno", error: error.message });
  }
};

// Obtener todos los alumnos
export const getAlumnos = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(alumnoEntity);
    const alumnos = await repo.find({ relations: ["materias", "tareas"] });
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener alumnos", error: error.message });
  }
};

// Obtener alumno por ID
export const getAlumnoById = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(alumnoEntity);
    const alumno = await repo.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ["materias", "tareas"],
    });
    if (!alumno) return res.status(404).json({ message: "Alumno no encontrado" });
    res.json(alumno);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener alumno", error: error.message });
  }
};

// Actualizar alumno
export const updateAlumno = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(alumnoEntity);
    const alumno = await repo.findOneBy({ id: parseInt(req.params.id) });
    if (!alumno) return res.status(404).json({ message: "Alumno no encontrado" });

    repo.merge(alumno, req.body);
    const actualizado = await repo.save(alumno);
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar alumno", error: error.message });
  }
};

// Eliminar alumno
export const deleteAlumno = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(alumnoEntity);
    const result = await repo.delete({ id: parseInt(req.params.id) });
    if (result.affected === 0) return res.status(404).json({ message: "Alumno no encontrado" });
    res.json({ message: "Alumno eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar alumno", error: error.message });
  }
};
