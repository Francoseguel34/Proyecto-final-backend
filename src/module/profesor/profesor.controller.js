import { AppDataSource } from "../../providers/datasource.provider.js";
import { Profesor } from "./entity/profesor.entity.js";
import bcrypt from "bcrypt";

// Crear profesor con contraseña cifrada
export const createProfesor = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(Profesor);

    // Encriptar la contraseña antes de guardar
    const { password, ...data } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const profesor = repo.create({
      ...data,
      password: hashedPassword,
    });

    const nuevo = await repo.save(profesor);

    // No devolver el hash en la respuesta
    const { password: _, ...profesorSinClave } = nuevo;
    res.status(201).json(profesorSinClave);
  } catch (error) {
    res.status(500).json({ message: "Error al crear profesor", error: error.message });
  }
};

// Obtener todos los profesores
export const getProfesores = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(Profesor);
    const profesores = await repo.find({ relations: ["materias"] });

    // Evitar mostrar las contraseñas
    const sinPassword = profesores.map(({ password, ...rest }) => rest);
    res.json(sinPassword);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener profesores", error: error.message });
  }
};

// Obtener profesor por ID
export const getProfesorById = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(Profesor);
    const profesor = await repo.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ["materias"],
    });
    if (!profesor) return res.status(404).json({ message: "Profesor no encontrado" });

    // No mostrar contraseña
    const { password, ...sinClave } = profesor;
    res.json(sinClave);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener profesor", error: error.message });
  }
};

// Actualizar profesor (si cambia la contraseña, también se cifra)
export const updateProfesor = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(Profesor);
    const profesor = await repo.findOneBy({ id: parseInt(req.params.id) });
    if (!profesor) return res.status(404).json({ message: "Profesor no encontrado" });

    // Si envía nueva contraseña, encriptarla
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    repo.merge(profesor, req.body);
    const actualizado = await repo.save(profesor);

    const { password, ...sinClave } = actualizado;
    res.json(sinClave);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar profesor", error: error.message });
  }
};

// Eliminar profesor
export const deleteProfesor = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(Profesor);
    const result = await repo.delete({ id: parseInt(req.params.id) });
    if (result.affected === 0) return res.status(404).json({ message: "Profesor no encontrado" });
    res.json({ message: "Profesor eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar profesor", error: error.message });
  }
};
