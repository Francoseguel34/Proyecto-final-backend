import Joi from "joi";

export const createTareaDTO = Joi.object({
  titulo: Joi.string().min(3).max(150).required(),
  descripcion: Joi.string().allow("", null),
  fechaEntrega: Joi.date().greater("now").required(),
  materia_id: Joi.number().integer().required(),
  alumno_id: Joi.number().integer().optional(),
  archivoUrl: Joi.string().uri().optional(),
});

export const updateTareaDTO = Joi.object({
  titulo: Joi.string().min(3).max(150),
  descripcion: Joi.string().allow("", null),
  fechaEntrega: Joi.date().greater("now"),
  entregada: Joi.boolean(),
  archivoUrl: Joi.string().uri(),
  alumno_id: Joi.number().integer(),
});
