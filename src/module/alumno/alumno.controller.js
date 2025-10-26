import { AppDataSource } from "../../providers/datasource.provider.js";
import { Alumno } from "./entity/alumno.entity.js";
import bcrypt from "bcrypt";

// Crear alumno (encriptando la contraseña)
export const createAlumno = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(Alumno);

    // Encriptar contraseña antes de guardar
    const { password, ...data } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const alumno = repo.create({
      ...data,
      password: hashedPassword,
    });

    const nuevo = await repo.save(alumno);

    // No mostrar contraseña en la respuesta
    const { password: _, ...alumnoSinClave } = nuevo;
    res.status(201).json(alumnoSinClave);
  } catch (error) {
    res.status(500).json({ message: "Error al crear alumno", error: error.message });
  }
};

// Obtener todos los alumnos
export const getAlumnos = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(Alumno);
    const alumnos = await repo.find({ relations: ["materias", "tareas"] });

    // Evitar mostrar contraseñas
    const sinPassword = alumnos.map(({ password, ...rest }) => rest);
    res.json(sinPassword);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener alumnos", error: error.message });
  }
};

// Obtener alumno por ID
export const getAlumnoById = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(Alumno);
    const alumno = await repo.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ["materias", "tareas"],
    });
    if (!alumno) return res.status(404).json({ message: "Alumno no encontrado" });

    // No mostrar contraseña
    const { password, ...sinClave } = alumno;
    res.json(sinClave);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener alumno", error: error.message });
  }
};

// Actualizar alumno (si cambia la contraseña, también se encripta)
export const updateAlumno = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(Alumno);
    const alumno = await repo.findOneBy({ id: parseInt(req.params.id) });
    if (!alumno) return res.status(404).json({ message: "Alumno no encontrado" });

    // Si se envía una nueva contraseña, encriptarla
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    repo.merge(alumno, req.body);
    const actualizado = await repo.save(alumno);

    const { password, ...sinClave } = actualizado;
    res.json(sinClave);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar alumno", error: error.message });
  }
};

// Eliminar alumno
export const deleteAlumno = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(Alumno);
    const result = await repo.delete({ id: parseInt(req.params.id) });
    if (result.affected === 0)
      return res.status(404).json({ message: "Alumno no encontrado" });

    res.json({ message: "Alumno eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar alumno", error: error.message });
  }
};
