import { AppDataSource } from "../../providers/datasource.provider.js";
import { materiaEntity } from "./entity/materia.entity.js";

// Crear materia
export const createMateria = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(materiaEntity);
    const materia = repo.create(req.body);
    const nueva = await repo.save(materia);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ message: "Error al crear materia", error: error.message });
  }
};

// Obtener todas las materias
export const getMaterias = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(materiaEntity);
    const materias = await repo.find({ relations: ["profesor", "alumnos", "tareas"] });
    res.json(materias);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener materias", error: error.message });
  }
};

// Obtener materia por ID
export const getMateriaById = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(materiaEntity);
    const materia = await repo.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ["profesor", "alumnos", "tareas"],
    });
    if (!materia) return res.status(404).json({ message: "Materia no encontrada" });
    res.json(materia);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener materia", error: error.message });
  }
};

// Actualizar materia
export const updateMateria = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(materiaEntity);
    const materia = await repo.findOneBy({ id: parseInt(req.params.id) });
    if (!materia) return res.status(404).json({ message: "Materia no encontrada" });

    repo.merge(materia, req.body);
    const actualizada = await repo.save(materia);
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar materia", error: error.message });
  }
};

// Eliminar materia
export const deleteMateria = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(materiaEntity);
    const result = await repo.delete({ id: parseInt(req.params.id) });
    if (result.affected === 0) return res.status(404).json({ message: "Materia no encontrada" });
    res.json({ message: "Materia eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar materia", error: error.message });
  }
};
