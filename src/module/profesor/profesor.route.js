import { Router } from "express";
import {
  createProfesor,
  getProfesores,
  getProfesorById,
  updateProfesor,
  deleteProfesor,
} from "./profesor.controller.js";
import { validateBody } from "../../middleware/validator.middleware.js";
import { createProfesorDTO, updateProfesorDTO } from "./schema/profesor.dto.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const router = Router();

// Registro público (sin token)
router.post("/", validateBody(createProfesorDTO), createProfesor);

// Rutas protegidas (requieren token)
router.get("/", authMiddleware, getProfesores);
router.get("/:id", authMiddleware, getProfesorById);
router.put("/:id", authMiddleware, validateBody(updateProfesorDTO), updateProfesor);
router.delete("/:id", authMiddleware, deleteProfesor);

export default router;