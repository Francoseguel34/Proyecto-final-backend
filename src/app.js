import express from "express";
import passport from "./configuration/passport.js";

// 🔹 Importar rutas primero (para que estén disponibles antes del uso)
import authRoutes from "./module/auth/auth.route.js";
import profesorRoutes from "./module/profesor/profesor.route.js";
import alumnoRoutes from "./module/alumno/alumno.route.js";
import materiaRoutes from "./module/materia/materia.route.js";
import tareaRoutes from "./module/tarea/tarea.route.js";
import alumnoMateriaRoutes from "./module/alumno_materia/alumno_materia.route.js"; // 👈 nuevo módulo

const app = express();

// 🔹 Middlewares globales
app.use(express.json());
app.use(passport.initialize());

// 🔹 Rutas principales
app.use("/api/auth", authRoutes);
app.use("/api/profesores", profesorRoutes);
app.use("/api/alumnos", alumnoRoutes);
app.use("/api/materias", materiaRoutes);
app.use("/api/tareas", tareaRoutes);
app.use("/api/matriculas", alumnoMateriaRoutes); // 👈 ruta del nuevo módulo

// 🔹 Ruta base (para probar servidor)
app.get("/", (req, res) => {
  res.send("✅ Servidor Backend funcionando correctamente");
});

export default app;
