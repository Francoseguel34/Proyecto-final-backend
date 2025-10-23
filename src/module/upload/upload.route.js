import { Router } from "express";
import { upload } from "../../middleware/multer.middleware.js";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

// 🔹 Conexión a la base de datos (usando tus datos del .env)
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "backend_final",
});

router.post("/", upload.single("archivo"), async (req, res) => {
  try {
    const { alumno_id, tarea_id } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No se subió ningún archivo" });
    }

    // Ruta pública del archivo
    const archivoUrl = `/uploads/${req.file.filename}`;

    // Actualizar la tarea en la BD
    const [result] = await pool.query(
      `UPDATE tareas 
       SET archivoUrl = ?, entregada = 1 
       WHERE id = ? AND alumno_id = ?`,
      [archivoUrl, tarea_id, alumno_id]
    );

    // Si no se afectó ninguna fila, el alumno o tarea no coincide
    if (result.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        message: "No se encontró una tarea asociada a ese alumno.",
      });
    }

    res.json({
      ok: true,
      message: "Archivo subido y tarea actualizada correctamente",
      archivoUrl,
      tarea_id: Number(tarea_id),
      alumno_id: Number(alumno_id),
    });
  } catch (error) {
    console.error("Error al subir archivo:", error);
    res.status(500).json({ ok: false, message: "Error en el servidor", error });
  }
});

export default router;
