import { Router } from "express";
import {
  createMateria,
  getMaterias,
  getMateriaById,
  updateMateria,
  deleteMateria,
} from "./materia.controller.js";
import { validateBody } from "../../middleware/validator.middleware.js";
import { createMateriaDTO, updateMateriaDTO } from "./schema/materia.dto.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, getMaterias);
router.get("/:id", authMiddleware, getMateriaById);
router.post("/", authMiddleware, validateBody(createMateriaDTO), createMateria);
router.put("/:id", authMiddleware, validateBody(updateMateriaDTO), updateMateria);
router.delete("/:id", authMiddleware, deleteMateria);

export default router;
