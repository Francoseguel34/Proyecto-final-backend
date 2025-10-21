import { EntitySchema } from "typeorm";

export const Alumno = new EntitySchema({
  name: "Alumno",
  tableName: "alumnos",
  columns: {
    id: { type: Number, primary: true, generated: true },
    nombre: { type: String, nullable: false },
    apellido: { type: String, nullable: false },
    email: { type: String, unique: true, nullable: false },
    password: { type: String, nullable: false },
  },
  relations: {
    tareas: {
      target: "Tarea",
      type: "one-to-many",
      inverseSide: "alumno",
    },
    materias: {
      target: "Materia",
      type: "many-to-many",
      inverseSide: "alumnos",
      joinTable: { name: "alumno_materia" },
    },
  },
});
