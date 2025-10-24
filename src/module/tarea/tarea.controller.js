import { AppDataSource } from "../../providers/datasource.provider.js";
import { Tarea } from "./entity/tarea.entity.js";

// Crear tarea
export const createTarea = async (req, res) => {
  try {
    const tareaRepo = AppDataSource.getRepository(Tarea);
    const { titulo, descripcion, fechaEntrega, archivoUrl, materia_id, alumno_id } = req.body;

    // Crear tarea con relaciones (TypeORM entiende los objetos relacionados)
    const tarea = tareaRepo.create({
      titulo,
      descripcion,
      fechaEntrega,
      archivoUrl,
      materia: { id: materia_id },
      alumno: alumno_id ? { id: alumno_id } : null,
    });

    const nuevaTarea = await tareaRepo.save(tarea);

    // Emitir notificación por Socket.IO
    const io = req.app.get("io");
    io.emit("nueva_tarea", {
      message: `🆕 Nueva tarea creada: ${tarea.titulo}`,
      data: nuevaTarea,
    });

    // Responder al cliente solo una vez ✅
    return res.status(201).json({
      ok: true,
      message: "Tarea creada correctamente",
      data: nuevaTarea,
    });

  } catch (error) {
    console.error("❌ Error en createTarea:", error);
    return res.status(500).json({
      message: "Error al crear tarea",
      error: error.message,
    });
  }
};

// Listar todas las tareas
export const getTareas = async (req, res) => {
  try {
    const tareaRepo = AppDataSource.getRepository(Tarea);
    const tareas = await tareaRepo.find({
      relations: ["materia", "alumno"],
    });
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tareas", error: error.message });
  }
};

// Obtener una tarea por ID
export const getTareaById = async (req, res) => {
  try {
    const tareaRepo = AppDataSource.getRepository(Tarea);
    const tarea = await tareaRepo.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ["materia", "alumno"],
    });

    if (!tarea) return res.status(404).json({ message: "Tarea no encontrada" });
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tarea", error: error.message });
  }
};

// Actualizar tarea
export const updateTarea = async (req, res) => {
  try {
    const tareaRepo = AppDataSource.getRepository(Tarea);
    const tarea = await tareaRepo.findOneBy({ id: parseInt(req.params.id) });

    if (!tarea) return res.status(404).json({ message: "Tarea no encontrada" });

    tareaRepo.merge(tarea, req.body);
    const tareaActualizada = await tareaRepo.save(tarea);

    res.json({
      ok: true,
      message: "Tarea actualizada correctamente",
      data: tareaActualizada,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar tarea", error: error.message });
  }
};

// Eliminar tarea
export const deleteTarea = async (req, res) => {
  try {
    const tareaRepo = AppDataSource.getRepository(Tarea);
    const result = await tareaRepo.delete({ id: parseInt(req.params.id) });

    if (result.affected === 0)
      return res.status(404).json({ message: "Tarea no encontrada" });

    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar tarea", error: error.message });
  }
};

// Entregar una tarea
export const entregarTarea = async (req, res) => {
  try {
    const tareaRepo = AppDataSource.getRepository(Tarea);
    const { id } = req.params; // ID de la tarea
    const { alumno_id } = req.body; // quién la entrega (puede venir del token más adelante)

    const tarea = await tareaRepo.findOne({
      where: { id: parseInt(id) },
      relations: ["materia", "alumno"]
    });

    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    // Marcar como entregada
    tarea.entregada = true;
    await tareaRepo.save(tarea);

    // Emitir evento por Socket.IO
    const io = req.app.get("io");
    io.emit("tarea_entregada", {
      message: `El alumno con ID ${alumno_id} entregó la tarea: ${tarea.titulo}`,
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
