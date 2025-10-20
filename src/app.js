import express from "express";
import passport from "./configuration/passport.js";
import authRoutes from "./module/auth/auth.route.js";

const app = express();

app.use("/api/auth", authRoutes);

app.use(express.json());
app.use(passport.initialize());

// Rutas principales
app.use("/api/profesores", profesorRoutes);
app.use("/api/alumnos", alumnoRoutes);
app.use("/api/materias", materiaRoutes);
app.use("/api/tareas", tareaRoutes);

// Importar rutas de los módulos
import profesorRoutes from "./module/profesor/profesor.route.js";
import alumnoRoutes from "./module/alumno/alumno.route.js";
import materiaRoutes from "./module/materia/materia.route.js";
import tareaRoutes from "./module/tarea/tarea.route.js";

// Ruta base para probar el servidor
app.get("/", (req, res) => res.send("✅ Servidor Backend funcionando"));

export default app;
