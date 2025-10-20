import { Router } from "express";
import {
  createAlumno,
  getAlumnos,
  getAlumnoById,
  updateAlumno,
  deleteAlumno,
} from "./alumno.controller.js";
import { validateBody } from "../../middleware/validator.middleware.js";
import { createAlumnoDTO, updateAlumnoDTO } from "./schema/alumno.dto.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, getAlumnos);
router.get("/:id", authMiddleware, getAlumnoById);
router.post("/", authMiddleware, validateBody(createAlumnoDTO), createAlumno);
router.put("/:id", authMiddleware, validateBody(updateAlumnoDTO), updateAlumno);
router.delete("/:id", authMiddleware, deleteAlumno);

export default router;
