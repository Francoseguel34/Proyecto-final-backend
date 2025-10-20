import { Router } from "express";
import { login } from "./auth.controller.js";

const router = Router();

// Endpoint público para login
router.post("/login", login);

export default router;
