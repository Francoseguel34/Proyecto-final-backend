import { DataSource } from "typeorm";
import { Profesor } from "../module/profesor/entity/profesor.entity.js";
import { Alumno } from "../module/alumno/entity/alumno.entity.js";
import { Materia } from "../module/materia/entity/materia.entity.js";
import { Tarea } from "../module/tarea/entity/tarea.entity.js";
import { AlumnoMateria } from "../module/alumno_materia/entity/alumno_materia.entity.js";
import "reflect-metadata";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "backend_final",
synchronize: false,
dropSchema: false, // ⚠️ importante mantenerlo una sola ejecución
  logging: false,
  entities: [Profesor, Alumno, Materia, Tarea, AlumnoMateria],
});
