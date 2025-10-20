import Joi from "joi";

/**
 * Middleware para validar el body de una petición con Joi
 * @param {Joi.ObjectSchema} schema - DTO de Joi
 */
export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        ok: false,
        message: "Error de validación",
        errors: error.details.map(d => d.message),
      });
    }
    next();
  };
};
