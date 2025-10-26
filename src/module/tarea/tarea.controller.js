import { AppDataSource } from "../../providers/datasource.provider.js";
import { Tarea } from "./entity/tarea.entity.js";

// Crear tarea → solo profesor
export const createTarea = async (req, res) => {
  try {
    if (req.user.rol !== "profesor") {
      return res.status(403).json({ message: "Solo un profesor puede crear tareas" });
    }

    const { titulo, descripcion, fechaEntrega, archivoUrl, materia_id } = req.body;
    const tareaRepo = AppDataSource.getRepository(Tarea);

    const tarea = tareaRepo.create({
      titulo,
      descripcion,
      fechaEntrega,
      archivoUrl,
      materia: { id: materia_id },
      alumno: null,                 
      profesor: { id: req.user.id } 
    });

    const nuevaTarea = await tareaRepo.save(tarea);

    // Emitir notificación de nueva tarea
    const io = req.app.get("io");
    io.emit("nueva_tarea", {
      message: `🆕 Nueva tarea creada: ${tarea.titulo}`,
      data: nuevaTarea
    });

    return res.status(201).json({
      ok: true,
      message: "Tarea creada correctamente",
      data: nuevaTarea
    });

  } catch (error) {
    console.error("❌ Error en createTarea:", error);
    return res.status(500).json({ message: "Error al crear tarea", error: error.message });
  }
};

// Listar todas las tareas
export const getTareas = async (req, res) => {
  try {
    const tareaRepo = AppDataSource.getRepository(Tarea);
    const tareas = await tareaRepo.find({ relations: ["materia", "alumno"] });
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tareas", error: error.message });
  }
};

// Obtener tarea por ID
export const getTareaById = async (req, res) => {
  try {
    const tareaRepo = AppDataSource.getRepository(Tarea);
    const tarea = await tareaRepo.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ["materia", "alumno"]
    });

    if (!tarea) return res.status(404).json({ message: "Tarea no encontrada" });
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tarea", error: error.message });
  }
};

// Actualizar tarea → solo profesor
export const updateTarea = async (req, res) => {
  try {
    if (req.user.rol !== "profesor") {
      return res.status(403).json({ message: "Solo un profesor puede actualizar tareas" });
    }

    const tareaRepo = AppDataSource.getRepository(Tarea);
    const tarea = await tareaRepo.findOneBy({ id: parseInt(req.params.id) });

    if (!tarea) return res.status(404).json({ message: "Tarea no encontrada" });

    tareaRepo.merge(tarea, req.body);
    const tareaActualizada = await tareaRepo.save(tarea);

    res.json({
      ok: true,
      message: "Tarea actualizada correctamente",
      data: tareaActualizada
    });

  } catch (error) {
    res.status(500).json({ message: "Error al actualizar tarea", error: error.message });
  }
};

// Eliminar tarea → solo profesor
export const deleteTarea = async (req, res) => {
  try {
    if (req.user.rol !== "profesor") {
      return res.status(403).json({ message: "Solo un profesor puede eliminar tareas" });
    }

    const tareaRepo = AppDataSource.getRepository(Tarea);
    const result = await tareaRepo.delete({ id: parseInt(req.params.id) });

    if (result.affected === 0)
      return res.status(404).json({ message: "Tarea no encontrada" });

    res.json({ message: "Tarea eliminada correctamente" });

  } catch (error) {
    res.status(500).json({ message: "Error al eliminar tarea", error: error.message });
  }
};

// Entregar tarea → solo alumno
export const entregarTarea = async (req, res) => {
  try {
    if (req.user.rol !== "alumno") {
      return res.status(403).json({ message: "Solo un alumno puede entregar tareas" });
    }

    const tareaRepo = AppDataSource.getRepository(Tarea);
    const { id } = req.params;

    const tarea = await tareaRepo.findOne({
      where: { id: parseInt(id) },
      relations: ["materia", "alumno"]
    });

    if (!tarea) return res.status(404).json({ message: "Tarea no encontrada" });

    tarea.alumno = { id: req.user.id }; 
    tarea.entregada = true;
    await tareaRepo.save(tarea);

    // Emitir notificación de entrega
    const io = req.app.get("io");
    io.emit("tarea_entregada", {
      message: `El alumno ${req.user.nombre} entregó la tarea: ${tarea.titulo}`,
      data: tarea
    });

    return res.status(200).json({
      ok: true,
      message: "Tarea entregada correctamente",
      data: tarea
    });

  } catch (error) {
    res.status(500).json({ message: "Error al entregar tarea", error: error.message });
  }
};
