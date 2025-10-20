import { Router } from "express";
import {
  createTarea,
  getTareas,
  getTareaById,
  updateTarea,
  deleteTarea,
} from "./tarea.controller.js";

import { validateBody } from "../../middleware/validator.middleware.js";
import { createTareaDTO, updateTareaDTO } from "./schema/tarea.dto.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const router = Router();

// Endpoints
router.get("/", authMiddleware, getTareas);
router.get("/:id", authMiddleware, getTareaById);
router.post("/", authMiddleware, validateBody(createTareaDTO), createTarea);
router.put("/:id", authMiddleware, validateBody(updateTareaDTO), updateTarea);
router.delete("/:id", authMiddleware, deleteTarea);

export default router;
