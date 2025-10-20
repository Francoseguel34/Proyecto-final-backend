import Joi from "joi";

export const createMateriaDTO = Joi.object({
  nombre: Joi.string().min(3).max(100).required(),
  descripcion: Joi.string().allow("", null),
  profesor_id: Joi.number().integer().required(),
});

export const updateMateriaDTO = Joi.object({
  nombre: Joi.string().min(3).max(100),
  descripcion: Joi.string().allow("", null),
  profesor_id: Joi.number().integer(),
});
