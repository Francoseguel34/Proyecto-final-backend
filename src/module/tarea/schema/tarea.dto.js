import Joi from "joi";

// ✅ DTO para crear una nueva tarea
export const createTareaDTO = Joi.object({
  titulo: Joi.string().min(3).max(150).required(),
  descripcion: Joi.string().allow("", null),
  fechaEntrega: Joi.date().greater("now").required(),
  materia_id: Joi.number().integer().required(),
  alumno_id: Joi.number().integer().allow(null).optional(),
  archivoUrl: Joi.string().uri().allow(null, '').optional(), // acepta URL, vacío o null
});

// ✅ DTO para actualizar una tarea existente
export const updateTareaDTO = Joi.object({
  titulo: Joi.string().min(3).max(150).optional(),
  descripcion: Joi.string().allow("", null).optional(),
  fechaEntrega: Joi.date().greater("now").optional(),
  entregada: Joi.boolean().optional(),
  archivoUrl: Joi.string().uri().allow(null, '').optional(), // mismo criterio que en create
  alumno_id: Joi.number().integer().allow(null).optional(),
});
