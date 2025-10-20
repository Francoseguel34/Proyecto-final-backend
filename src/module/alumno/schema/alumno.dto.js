import Joi from "joi";

export const createAlumnoDTO = Joi.object({
  nombre: Joi.string().min(2).max(100).required(),
  apellido: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const updateAlumnoDTO = Joi.object({
  nombre: Joi.string().min(2).max(100),
  apellido: Joi.string().min(2).max(100),
  email: Joi.string().email(),
  password: Joi.string().min(6),
});
