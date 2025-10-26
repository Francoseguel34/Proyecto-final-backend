import express from "express";
import passport from "./configuration/passport.js";

// Importar rutas
import authRoutes from "./module/auth/auth.route.js";
import profesorRoutes from "./module/profesor/profesor.route.js";
import alumnoRoutes from "./module/alumno/alumno.route.js";
import materiaRoutes from "./module/materia/materia.route.js";
import tareaRoutes from "./module/tarea/tarea.route.js";
import alumnoMateriaRoutes from "./module/alumno_materia/alumno_materia.route.js";
import uploadRoutes from "./module/upload/upload.route.js"; // 👈 nueva ruta

const app = express();

// Middlewares globales
app.use(express.json());
app.use(passport.initialize());

// Servir carpeta de archivos subidos
app.use("/uploads", express.static("src/uploads"));

// Rutas principales
app.use("/api/auth", authRoutes);
app.use("/api/profesores", profesorRoutes);
app.use("/api/alumnos", alumnoRoutes);
app.use("/api/materias", materiaRoutes);
app.use("/api/tareas", tareaRoutes);
app.use("/api/matriculas", alumnoMateriaRoutes);
app.use("/api/upload", uploadRoutes); 

// Ruta base
app.get("/", (req, res) => {
  res.send("Servidor Backend funcionando correctamente");
});

export default app;
