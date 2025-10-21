import { AppDataSource } from "../../providers/datasource.provider.js";
import { profesorEntity } from "./entity/profesor.entity.js";

// Crear profesor
export const createProfesor = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(profesorEntity);
    const profesor = repo.create(req.body);
    const nuevo = await repo.save(profesor);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: "Error al crear profesor", error: error.message });
  }
};

// Obtener todos los profesores
export const getProfesores = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(profesorEntity);
    const profesores = await repo.find({ relations: ["materias"] });
    res.json(profesores);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener profesores", error: error.message });
  }
};

// Obtener profesor por ID
export const getProfesorById = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(profesorEntity);
    const profesor = await repo.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ["materias"],
    });
    if (!profesor) return res.status(404).json({ message: "Profesor no encontrado" });
    res.json(profesor);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener profesor", error: error.message });
  }
};

// Actualizar profesor
export const updateProfesor = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(profesorEntity);
    const profesor = await repo.findOneBy({ id: parseInt(req.params.id) });
    if (!profesor) return res.status(404).json({ message: "Profesor no encontrado" });

    repo.merge(profesor, req.body);
    const actualizado = await repo.save(profesor);
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar profesor", error: error.message });
  }
};

// Eliminar profesor
export const deleteProfesor = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(profesorEntity);
    const result = await repo.delete({ id: parseInt(req.params.id) });
    if (result.affected === 0) return res.status(404).json({ message: "Profesor no encontrado" });
    res.json({ message: "Profesor eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar profesor", error: error.message });
  }
};
