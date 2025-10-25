import { Router } from "express";
import {
  createTarea,
  getTareas,
  getTareaById,
  updateTarea,
  deleteTarea,
  entregarTarea,
} from "./tarea.controller.js";

import { validateBody } from "../../middleware/validator.middleware.js";
import { createTareaDTO, updateTareaDTO } from "./schema/tarea.dto.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";

const router = Router();

// Endpoints
router.get("/", authMiddleware, getTareas);
router.get("/:id", authMiddleware, getTareaById);

// Solo los profesores pueden crear, actualizar o eliminar tareas
router.post(
  "/",
  authMiddleware,
  authorizeRoles("profesor"),
  validateBody(createTareaDTO),
  createTarea
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("profesor"),
  validateBody(updateTareaDTO),
  updateTarea
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("profesor"),
  deleteTarea
);

// Solo los alumnos pueden entregar tareas
router.put(
  "/:id/entregar",
  authMiddleware,
  authorizeRoles("alumno"),
  entregarTarea
);

export default router;
